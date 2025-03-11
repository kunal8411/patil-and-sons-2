import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler } from "lucide-react";
import { PropertyDetailsModal } from "./PropertyDetailsModal";
import Image from 'next/image';

interface Property {
  title: string;
  location: string;
  area: string;
  description: string;
  price: string;
  type: string;
  images: { url: string }[];
  videos: { url: string }[];
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          {property.images.length > 0 ? (
            <Image
              src={property.images[0]?.url}
              alt={property.title}
              width={400}
              height={250}
              className="w-full h-full object-cover rounded-t-lg"
              style={{ objectFit: 'cover' }}
            />
          ) : property.videos.length > 0 ? (
            <video
              src={property.videos[0]?.url}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              No media available
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{property.title}</h3>
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property?.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Ruler className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.area}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {property.description}
          </p>
        </CardContent>
        <CardHeader className="p-4 pt-0 flex justify-between items-center">
          <span className="text-lg font-semibold text-primary">
            {property.price}
          </span>
          <Badge variant="secondary">{property.type}</Badge>
        </CardHeader>
      </Card>

      <PropertyDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={property}
      />
    </>
  );
}