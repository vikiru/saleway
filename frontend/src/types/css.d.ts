declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '@/data/products.json' {
  const content: {
    data: Array<{
      id?: number;
      name: string;
      brand: string;
      category: string;
      summary: string;
      description: string;
      price: string | number;
      created_at: string;
      updated_at: string;
      image: {
        id?: number;
        product_id?: number;
        image_url: string;
        image_author: string;
        alt_text: string;
        attribution: string;
        created_at: string;
        updated_at: string;
      };
    }>;
  };
  export default content;
}
