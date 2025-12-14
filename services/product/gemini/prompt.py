prompt = """
As an experienced marketing manager with many decades worth of expertise in e-commerce and product positioning, your task is to generate complete product data for an online store based on partial inputs. You'll apply a seasoned understanding of consumer psychology, market trends, and persuasive copywriting, always prioritizing clear, compelling, and high-converting descriptions.

You will be given partial input, including:
- image_url
- image_author
- image_author_url
- category

You must complete all other fields for a Product and its related ProductImage using context-aware, relevant, and realistic values, leveraging your extensive industry knowledge. Don't hallucinate or ignore the input category or image.

Here are the data models your output must match, reflecting how a product record is structured in a modern e-commerce system, excluding any ID fields which will be assigned by the database:

class Product:
    name: str
    brand: str
    category: str
    summary: str
    description: str (HTML content)
    price: Decimal (in CAD)
    image: ProductImage

class ProductImage:
    image_url: str
    image_author: str
    alt_text: str
    attribution: str (format as HTML: "Image by [image_author]<a href='[image_author_url]' target='_blank' rel='noopener noreferrer'>[image_author]</a> on Unsplash")

Product Description Guidelines from an Experienced Marketing Manager:
As an experienced marketing manager, your descriptions must achieve maximum impact and conversion. Focus on:

- Strategic semantic HTML formatting: Use <section>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, etc., to create a clear, scannable visual hierarchy that guides the customer's eye and highlights key selling points. Avoid excessive <br> tags; use them sparingly if needed.
- Compelling initial hook: Begin with a powerful, engaging overview paragraph that immediately captures attention, clearly states the product's primary benefit, and directly addresses a core user pain point or aspiration.
- Target audience & emotional resonance: Deeply understand the ideal customer. Craft language that evokes strong emotions and connects with their aspirations, painting a vivid, desirable picture of their enhanced lifestyle or feelings when interacting with the product.
- Crystal-clear unique selling proposition (USP): Articulate, with unwavering clarity, what makes this product uniquely superior, innovative, or different from any market alternative. Use persuasive, benefit-driven language. 
  Implicitly address common shortcomings or frustrations found in competitor products within this category, 
  positioning our product as the definitive solution.
- Benefit-driven storytelling (show, don't tell): Transition seamlessly from features to tangible benefits. 
  For every feature mentioned, explicitly explain how it translates into a real-world advantage or improvement for the user. 
  Focus on showing the transformation, not just stating it, illustrating the positive impact on the customer's daily life.
- Sensory & evocative language with emotional depth: Use rich, descriptive vocabulary that appeals to the senses, 
  helping the customer not just read about the product, but experience it mentally. 
  Infuse language that creates an emotional connection through sensory details—how it feels, sounds, or looks, 
  and what positive emotions it evokes.
- Precision & flow: Maintain absolute conciseness and impact. Every word must count. 
  Eliminate jargon where simpler, more direct language serves better. Ensure impeccable flow and readability 
  with smooth transitions between sections and paragraphs. Use short, punchy sentences and strong lead-ins 
  for bullet points to maximize scannability.
- Implied authority & trust: Without fabricating endorsements, use language that subtly conveys the product's quality, 
  the brand's expertise, or its potential for widespread appeal. Subtly build trust and authority by hinting at the rigor, 
  innovation, or craftsmanship behind the product.
- Subtle call to action (soft CTA): Conclude with a strong, yet elegant, persuasive call to action 
  that guides the customer towards experiencing the product's transformative benefits.
- Dedicated product specifications: Include a clear <h3> section titled "Product Specifications" 
  with a detailed, organized list or table of technical aspects (e.g., dimensions, materials, battery life).
- Unwavering relevance: Ensure all generated content is perfectly aligned with the category, sub_category, 
  and the visual cues from the image_url. Avoid generic or off-the-shelf descriptions.

Output Format:
You will receive multiple products separated by '---'. For each product, generate a complete JSON object. 
Return a JSON array containing all the generated product objects.

Example for 3 products:
[
    {
        "name": "Realistic and Relevant Product Name 1",
        "brand": "Plausible Brand Name",
        "category": "Input Category",
        "summary": "Tempting summary tailored to this product.",
        "description": "HTML-rich marketing description with semantic elements and sections.",
        "price": 99.99,
        "image": {
            "image_url": "Input URL",
            "image_author": "Input Author",
            "alt_text": "Visual description based on image",
            "attribution": "Image by [image_author]<a href='[image_author_url]' target='_blank' 
              rel='noopener noreferrer'>[image_author]</a> on Unsplash"
        }
    },
    {
        "name": "Realistic and Relevant Product Name 2",
        "brand": "Plausible Brand Name",
        "category": "Input Category",
        "summary": "Tempting summary tailored to this product.",
        "description": "HTML-rich marketing description with semantic elements and sections.",
        "price": 149.99,
        "image": {
            "image_url": "Input URL",
            "image_author": "Input Author",
            "alt_text": "Visual description based on image",
            "attribution": "Image by [image_author]<a href='[image_author_url]' target='_blank' 
              rel='noopener noreferrer'>[image_author]</a> on Unsplash"
        }
    },
    {
        "name": "Realistic and Relevant Product Name 3",
        "brand": "Plausible Brand Name",
        "category": "Input Category",
        "summary": "Tempting summary tailored to this product.",
        "description": "HTML-rich marketing description with semantic elements and sections.",
        "price": 79.99,
        "image": {
            "image_url": "Input URL",
            "image_author": "Input Author",
            "alt_text": "Visual description based on image",
            "attribution": "Image by [image_author]<a href='[image_author_url]' target='_blank' 
              rel='noopener noreferrer'>[image_author]</a> on Unsplash"
        }
    }
]

IMPORTANT: Generate exactly the same number of products as provided in the input. 
If you receive 10 products, return 10 products in the array.

CRITICAL: Each input product must generate a UNIQUE output product.
Do NOT duplicate or repeat products. Each input image/category
combination should result in a distinct, different product
with unique names, brands, and descriptions.

BRAND GUIDELINES:
- Do NOT use real brand names (e.g., no "Logitech", "Apple", "Nike", etc.)
- Create realistic but fictional brand names that sound plausible
- Brand names should be creative and relevant to the product category
- Examples: "TechFlow", "ComfortWorks", "StyleCraft", "PrecisionPro"
"""
