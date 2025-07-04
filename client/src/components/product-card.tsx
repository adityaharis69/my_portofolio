import { Link } from "wouter";
import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 text-white hover:text-red-500 transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current text-red-500" : ""}`} />
          </button>
          {product.visualMatchScore && (
            <Badge className="absolute bottom-3 left-3 bg-secondary text-white">
              Visual Match: {product.visualMatchScore}%
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex">
              {renderStars(Math.round(parseFloat(product.rating || "0")))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.reviewCount} reviews)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                // Handle view details
              }}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
