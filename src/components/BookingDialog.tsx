import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useBookingStore, BookingItem } from '@/store/bookingStore';

const bookingSchema = z.object({
  guestName: z.string().min(2, 'Name must be at least 2 characters'),
  guestEmail: z.string().email('Valid email required'),
  guestPhone: z.string().min(10, 'Valid phone number required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  guests: z.coerce.number().min(1, 'At least 1 guest required').max(20, 'Maximum 20 guests'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingDialogProps {
  branchId: string;
  branchName: string;
  selectedItems: BookingItem[];
  onBookingComplete?: () => void;
}

export function BookingDialog({ branchId, branchName, selectedItems, onBookingComplete }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const addBooking = useBookingStore((state) => state.addBooking);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    // Create booking
    addBooking({
      branchId,
      branchName,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      date: data.date,
      time: data.time,
      guests: data.guests,
      items: selectedItems,
    });

    toast({
      title: 'Booking Confirmed!',
      description: `We've received your reservation for ${data.guests} ${data.guests === 1 ? 'guest' : 'guests'} on ${data.date} at ${data.time}.`,
    });

    setOpen(false);
    reset();
    onBookingComplete?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="shadow-lg">
          <Calendar className="mr-2 h-5 w-5" />
          Book Table {selectedItems.length > 0 && `(${selectedItems.length} items)`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reserve Your Table</DialogTitle>
          <DialogDescription>
            Book a table at {branchName}. We'll confirm your reservation shortly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="guestName">Your Name *</Label>
            <Input
              {...register('guestName')}
              id="guestName"
              placeholder="John Doe"
              className="h-11"
            />
            {errors.guestName && <p className="text-sm text-destructive">{errors.guestName.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guestEmail">Email *</Label>
              <Input
                {...register('guestEmail')}
                id="guestEmail"
                type="email"
                placeholder="john@example.com"
                className="h-11"
              />
              {errors.guestEmail && <p className="text-sm text-destructive">{errors.guestEmail.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestPhone">Phone *</Label>
              <Input
                {...register('guestPhone')}
                id="guestPhone"
                type="tel"
                placeholder="+1 555-0123"
                className="h-11"
              />
              {errors.guestPhone && <p className="text-sm text-destructive">{errors.guestPhone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date *
              </Label>
              <Input
                {...register('date')}
                id="date"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="h-11"
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time *
              </Label>
              <Input
                {...register('time')}
                id="time"
                type="time"
                className="h-11"
              />
              {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Number of Guests *
            </Label>
            <Input
              {...register('guests')}
              id="guests"
              type="number"
              min="1"
              max="20"
              defaultValue="2"
              className="h-11"
            />
            {errors.guests && <p className="text-sm text-destructive">{errors.guests.message}</p>}
          </div>

          {selectedItems.length > 0 && (
            <div className="space-y-2">
              <Label>Pre-selected Items ({selectedItems.length})</Label>
              <div className="bg-muted/50 rounded-lg p-3 space-y-1 max-h-32 overflow-y-auto">
                {selectedItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
