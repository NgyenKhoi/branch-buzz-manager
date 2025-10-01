import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const landingSchema = z.object({
  brandName: z.string().min(3, 'Brand name must be at least 3 characters'),
  tagline: z.string().max(100, 'Tagline must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
});

type LandingFormData = z.infer<typeof landingSchema>;

const CustomLanding = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LandingFormData>({
    resolver: zodResolver(landingSchema),
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (url: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: LandingFormData) => {
    // Get selected package and user info from localStorage
    const selectedPackage = JSON.parse(localStorage.getItem('selected_package') || '{}');
    const currentUser = JSON.parse(localStorage.getItem('mock_auth_user') || '{}');
    
    // Generate unique short code for the branch
    const shortCode = data.brandName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now().toString(36);
    
    // Create new branch data with all required fields
    const newBranch = {
      id: Date.now().toString(),
      name: data.brandName,
      shortCode,
      brandName: data.brandName,
      tagline: data.tagline || '',
      description: data.description || '',
      address: data.address,
      phone: data.phone,
      email: data.email,
      logoUrl: logo,
      bannerUrl: bannerImage,
      packageType: selectedPackage.packageType,
      ownerId: currentUser.id,
      managerId: null,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    
    // Store branch data in localStorage
    const existingBranches = JSON.parse(localStorage.getItem('mock_branches') || '[]');
    existingBranches.push(newBranch);
    localStorage.setItem('mock_branches', JSON.stringify(existingBranches));
    
    // Store landing page configuration
    const landingConfig = {
      ...data,
      logo,
      bannerImage,
      shortCode,
    };
    localStorage.setItem('landing_config', JSON.stringify(landingConfig));
    
    // Set this as the selected brand
    localStorage.setItem('selected_brand', JSON.stringify(newBranch));
    
    toast({
      title: 'Setup Complete!',
      description: 'Your restaurant is ready. Welcome to your dashboard!',
    });

    // Navigate to owner dashboard
    navigate('/dashboard/owner');
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Customize Your Landing Page</h1>
          <p className="text-lg text-muted-foreground">
            Create a beautiful landing page for your restaurant brand
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Logo</CardTitle>
              <CardDescription>Upload your restaurant logo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {logo ? (
                  <div className="relative">
                    <img src={logo} alt="Logo" className="w-32 h-32 object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => setLogo(null)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-smooth">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mt-2">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, setLogo)}
                    />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Banner Image */}
          <Card>
            <CardHeader>
              <CardTitle>Banner Image</CardTitle>
              <CardDescription>Upload a hero banner for your landing page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {bannerImage ? (
                  <div className="relative w-full">
                    <img src={bannerImage} alt="Banner" className="w-full h-48 object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => setBannerImage(null)}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-smooth">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mt-2">Upload Banner</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, setBannerImage)}
                    />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Brand Details */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
              <CardDescription>Enter your restaurant brand details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="brandName">Brand Name</Label>
                <Input {...register('brandName')} id="brandName" placeholder="Your Restaurant Name" />
                {errors.brandName && <p className="text-sm text-destructive mt-1">{errors.brandName.message}</p>}
              </div>

              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input {...register('tagline')} id="tagline" placeholder="Your catchy tagline" />
                {errors.tagline && <p className="text-sm text-destructive mt-1">{errors.tagline.message}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  {...register('description')}
                  id="description"
                  placeholder="Tell customers about your restaurant"
                  rows={4}
                />
                {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How customers can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input {...register('phone')} id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input {...register('email')} id="email" type="email" placeholder="contact@restaurant.com" />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input {...register('address')} id="address" placeholder="123 Main St, City, State, ZIP" />
                {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full">
            Complete Setup & Go to Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CustomLanding;
