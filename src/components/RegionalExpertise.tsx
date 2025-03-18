import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';

export default function RegionalExpertise() {
  const regions = [
    {
      name: "Nashik",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/6/425128997/PT/HQ/GJ/202455319/2-1000x1000.jpg",
      description: "Prime NA plots in developing areas"
    },
    {
      name: "Ozar",
      image: "https://media.licdn.com/dms/image/v2/C5622AQG2BtKSwfr6nA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1580482946526?e=2147483647&v=beta&t=Rcno2t835F3jPdAf5kdDl4SJurxzPoeM-13nNIb9qcA",
      description: "Agricultural lands with excellent connectivity"
    },
    {
      name: "Dindori",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/22/36/8c/lovely-vies-from-the.jpg?w=600&h=400&s=1",
      description: "Investment opportunities in growing regions"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center mb-16">Regional Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.map((region, index) => (
            <Card key={index} className="overflow-hidden">
              <Image
                src={region.image}
                alt={region.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{region.name}</h3>
                <p className="text-gray-600">{region.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
