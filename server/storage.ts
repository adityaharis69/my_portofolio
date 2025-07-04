import { 
  users, 
  products, 
  reviews, 
  testimonials, 
  newsletterSubscriptions,
  type User, 
  type InsertUser,
  type Product,
  type InsertProduct,
  type Review,
  type InsertReview,
  type Testimonial,
  type InsertTestimonial,
  type Newsletter,
  type InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(filters?: { category?: string; search?: string }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getReviews(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  subscribeNewsletter(subscription: InsertNewsletter): Promise<Newsletter>;
  getNewsletterCount(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private reviews: Map<number, Review>;
  private testimonials: Map<number, Testimonial>;
  private newsletters: Map<number, Newsletter>;
  private currentUserId: number;
  private currentProductId: number;
  private currentReviewId: number;
  private currentTestimonialId: number;
  private currentNewsletterId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.reviews = new Map();
    this.testimonials = new Map();
    this.newsletters = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentReviewId = 1;
    this.currentTestimonialId = 1;
    this.currentNewsletterId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: "79.99",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Electronics",
        rating: "4.8",
        reviewCount: 127,
        visualMatchScore: 94
      },
      {
        name: "Classic Leather Watch",
        description: "Elegant leather watch with minimalist design",
        price: "159.99",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Fashion",
        rating: "4.6",
        reviewCount: 89,
        visualMatchScore: 89
      },
      {
        name: "Protective Phone Case",
        description: "Durable protection for your smartphone",
        price: "29.99",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Electronics",
        rating: "4.9",
        reviewCount: 203,
        visualMatchScore: 91
      },
      {
        name: "Luxury Throw Blanket",
        description: "Soft and cozy throw blanket for your home",
        price: "49.99",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Home",
        rating: "4.7",
        reviewCount: 156,
        visualMatchScore: 87
      },
      {
        name: "Modern Desk Lamp",
        description: "Adjustable LED desk lamp with multiple brightness levels",
        price: "89.99",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Home",
        rating: "4.8",
        reviewCount: 94,
        visualMatchScore: 93
      },
      {
        name: "Designer Sunglasses",
        description: "Stylish sunglasses with UV protection",
        price: "129.99",
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Fashion",
        rating: "4.5",
        reviewCount: 76,
        visualMatchScore: 88
      },
      {
        name: "Ceramic Coffee Mug",
        description: "Handcrafted ceramic mug for your morning coffee",
        price: "19.99",
        imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Home",
        rating: "4.9",
        reviewCount: 112,
        visualMatchScore: 85
      },
      {
        name: "Aluminum Laptop Stand",
        description: "Ergonomic laptop stand for better posture",
        price: "69.99",
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Electronics",
        rating: "4.6",
        reviewCount: 168,
        visualMatchScore: 92
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });

    // Seed testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Sarah Chen",
        role: "Interior Designer",
        content: "I was looking for a specific style of lamp I saw in a magazine. Just uploaded the photo and VisualFind found the exact match! The visual search is incredibly accurate.",
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        rating: 5
      },
      {
        name: "Michael Rodriguez",
        role: "Software Engineer",
        content: "As a busy parent, I love how quick it is to find products. My daughter saw someone's shoes she liked, I took a quick photo, and found similar ones in minutes!",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        rating: 5
      },
      {
        name: "Emma Thompson",
        role: "Marketing Manager",
        content: "The reviews from real users helped me make the right choice. I found not just the product I wanted, but learned about quality and durability from people who actually own it.",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        rating: 5
      },
      {
        name: "David Kim",
        role: "Freelance Designer",
        content: "I've been using VisualFind for months now. The accuracy keeps getting better, and I love discovering new products I never would have found through traditional search.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        rating: 5
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(filters?: { category?: string; search?: string }): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (filters?.category && filters.category !== "All") {
      products = products.filter(p => p.category === filters.category);
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async getReviews(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(r => r.productId === productId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { 
      ...insertReview, 
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      createdAt: new Date()
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id,
      createdAt: new Date()
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterCount(): Promise<number> {
    return this.newsletters.size;
  }
}

export const storage = new MemStorage();
