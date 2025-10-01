import { useEffect, useState } from 'react';
import { useBookingStore, Booking } from '@/store/bookingStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, Calendar, Clock, Users, Phone, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function BookingNotification({ branchId }: { branchId?: string }) {
  const { bookings, unreadCount, markAsRead } = useBookingStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [displayedBookingIds, setDisplayedBookingIds] = useState<Set<string>>(new Set());

  const relevantBookings = branchId
    ? bookings.filter((b) => b.branchId === branchId)
    : bookings;

  useEffect(() => {
    // Show toast for new bookings
    relevantBookings.forEach((booking) => {
      if (!displayedBookingIds.has(booking.id) && booking.status === 'pending') {
        toast({
          title: '🔔 New Booking Request!',
          description: `${booking.guestName} wants to reserve a table for ${booking.guests} guests on ${booking.date}.`,
          duration: 5000,
        });
        setDisplayedBookingIds((prev) => new Set([...prev, booking.id]));
      }
    });
  }, [relevantBookings]);

  const recentBookings = relevantBookings
    .filter((b) => b.status === 'pending')
    .slice(0, 5);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {showNotifications && (
        <div className="absolute right-0 top-12 w-96 max-h-[500px] overflow-y-auto z-50 shadow-2xl rounded-lg border bg-card">
          <div className="sticky top-0 bg-card border-b px-4 py-3 flex items-center justify-between">
            <h3 className="font-semibold">New Bookings</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {recentBookings.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No new bookings</p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {recentBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{booking.guestName}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Users className="h-3 w-3" />
                          {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                        </CardDescription>
                      </div>
                      <Badge>{booking.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{booking.date}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span className="text-xs">{booking.guestPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="text-xs">{booking.guestEmail}</span>
                    </div>
                    {booking.items.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-xs font-medium mb-1">Pre-ordered Items:</p>
                        <div className="space-y-0.5">
                          {booking.items.map((item, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground flex justify-between">
                              <span>{item.name} x{item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          markAsRead(booking.id);
                          toast({
                            title: 'Booking Confirmed',
                            description: `Confirmed reservation for ${booking.guestName}`,
                          });
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          markAsRead(booking.id);
                          toast({
                            title: 'Booking Declined',
                            description: 'The guest will be notified.',
                          });
                        }}
                      >
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
