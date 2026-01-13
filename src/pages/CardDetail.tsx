import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { useGiftCard } from '@/hooks/useGiftCards';
import { transformGiftCard } from '@/types/giftCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Monitor, Package, ChevronLeft, Check, Gift, Shield, Clock, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';

const CardDetail = () => {
  const { id: slug } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data: cardData, isLoading } = useGiftCard(slug || '');
  
  const card = useMemo(() => 
    cardData ? transformGiftCard(cardData) : null, 
    [cardData]
  );

  const [selectedDenomination, setSelectedDenomination] = useState<number | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<'digital' | 'physical'>('digital');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

  // Set defaults when card loads
  useMemo(() => {
    if (card && selectedDenomination === null) {
      setSelectedDenomination(card.denominations[0]);
      setDeliveryOption(card.deliveryOptions[0] || 'digital');
    }
  }, [card, selectedDenomination]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!card) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Gift Card Not Found</h1>
          <p className="text-muted-foreground mb-6">The gift card you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/catalog')}>Browse Gift Cards</Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedDenomination) {
      toast({
        title: 'Please select a value',
        description: 'Choose a denomination before adding to cart.',
        variant: 'destructive',
      });
      return;
    }

    addItem({
      cardId: card.id,
      cardName: card.name,
      cardImage: card.image,
      denomination: selectedDenomination,
      deliveryOption,
      recipientEmail: deliveryOption === 'digital' ? recipientEmail : undefined,
      recipientName,
      personalMessage: personalMessage || undefined,
    });

    toast({
      title: 'Added to Cart',
      description: `${card.name} ($${selectedDenomination}) added to your cart.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>{card.name} | GiftCard Pro</title>
        <meta name="description" content={card.description} />
      </Helmet>
      <Layout>
        <div className="container py-8">
          {/* Breadcrumb */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-6 -ml-2"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-card bg-muted">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-success" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gift className="h-5 w-5 text-accent" />
                  <span>Add Message</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div>
              <div className="flex items-start gap-3 mb-2">
                {card.featured && (
                  <Badge className="gradient-accent text-accent-foreground border-0">Popular</Badge>
                )}
                {!card.inStock && (
                  <Badge variant="secondary">Out of Stock</Badge>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{card.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">{card.description}</p>

              <Card className="mb-6">
                <CardContent className="p-6 space-y-6">
                  {/* Denomination Selection */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Select Value</Label>
                    <div className="flex flex-wrap gap-2">
                      {card.denominations.map((value) => (
                        <Button
                          key={value}
                          variant={selectedDenomination === value ? 'default' : 'outline'}
                          onClick={() => setSelectedDenomination(value)}
                          className="min-w-[80px]"
                        >
                          ${value}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Option */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Delivery Method</Label>
                    <RadioGroup
                      value={deliveryOption}
                      onValueChange={(value) => setDeliveryOption(value as 'digital' | 'physical')}
                      className="grid grid-cols-2 gap-4"
                    >
                      {card.deliveryOptions.includes('digital') && (
                        <Label
                          htmlFor="digital"
                          className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${
                            deliveryOption === 'digital' ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'
                          }`}
                        >
                          <RadioGroupItem value="digital" id="digital" className="sr-only" />
                          <Monitor className="h-6 w-6 mb-2" />
                          <span className="font-medium">Digital</span>
                          <span className="text-xs text-muted-foreground">Instant email</span>
                          {deliveryOption === 'digital' && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </Label>
                      )}
                      {card.deliveryOptions.includes('physical') && (
                        <Label
                          htmlFor="physical"
                          className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${
                            deliveryOption === 'physical' ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'
                          }`}
                        >
                          <RadioGroupItem value="physical" id="physical" className="sr-only" />
                          <Package className="h-6 w-6 mb-2" />
                          <span className="font-medium">Physical</span>
                          <span className="text-xs text-muted-foreground">3-5 days</span>
                        </Label>
                      )}
                    </RadioGroup>
                  </div>

                  {/* Personalization */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Personalize (Optional)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="recipientName" className="text-sm">Recipient Name</Label>
                        <Input
                          id="recipientName"
                          placeholder="John Doe"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                        />
                      </div>
                      {deliveryOption === 'digital' && (
                        <div>
                          <Label htmlFor="recipientEmail" className="text-sm">Recipient Email</Label>
                          <Input
                            id="recipientEmail"
                            type="email"
                            placeholder="john@example.com"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-sm">Personal Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Write a personal message..."
                        value={personalMessage}
                        onChange={(e) => setPersonalMessage(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price & Add to Cart */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-display text-3xl font-bold">
                    ${selectedDenomination || card.denominations[0]}
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!card.inStock}
                  className="gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CardDetail;
