import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@/types/testimonial";

export default function Testimonials() {
  const testimonials = [
    {
      id:1,
      name: "Rajesh Patil",
      content:
        "Excellent service and professional guidance throughout the buying process.",
      location: "Nashik",
    },
    {
      id:2,
      name: "Amit Khairnar",
      content:
        "Very satisfied with the property documentation and legal assistance provided.",
      location: "Ozar",
    },
    {
      id:3,
      name: "Pankaj Kumar",
      content:
        "Very satisfied with the property service and professional guidance",
      location: "Nashik",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center mb-16">
          Client Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
