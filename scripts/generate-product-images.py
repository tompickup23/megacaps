#!/usr/bin/env python3
"""
MEGA Caps Product Image Generator

This script helps generate product mockup images using AI image generation.
You'll need either:
- OpenAI API key (for DALL-E 3)
- Midjourney subscription
- Canva Pro with Magic Media

Usage:
    python generate-product-images.py --provider openai --api-key YOUR_KEY
    python generate-product-images.py --provider midjourney --prompts-only

Generated images should be saved to:
    ~/clawd/projects/megacaps/images/products/

Then update index.html to use the real images instead of placeholders.
"""

import os
import argparse
import json
from pathlib import Path

# Product image prompts optimized for AI generation
PRODUCT_PROMPTS = {
    "mega-classic-red": {
        "name": "MEGA Classic Red",
        "prompt": "Professional product photography of a premium red baseball cap with bold white 'MEGA' embroidered text on the front. Structured 6-panel cotton twill cap, adjustable snapback closure. Clean white background, studio lighting, front-facing angle, high-end ecommerce style. 4K, photorealistic, sharp focus.",
        "variations": [
            "Red baseball cap with white 'MEGA' embroidery, studio shot, white background",
            "Premium red cap front view, bold white text, product photography"
        ]
    },
    "mega-classic-navy": {
        "name": "MEGA Classic Navy",
        "prompt": "Professional product photography of a premium navy blue baseball cap with gold metallic 'MEGA' embroidered text on the front. Rich navy cotton twill, antique brass hardware on adjustable strap. Clean white background, studio lighting, front-facing angle, high-end ecommerce style. 4K, photorealistic.",
        "variations": [
            "Navy blue baseball cap with gold 'MEGA' embroidery, studio shot",
            "Dark blue premium cap front view, metallic gold text, product photography"
        ]
    },
    "mega-white-red": {
        "name": "MEGA White & Red",
        "prompt": "Professional product photography of a premium white baseball cap with bold red 'MEGA' embroidered text and red contrast stitching. Clean white canvas with St George's Cross inspired red accents. White background, studio lighting, front-facing angle, high-end ecommerce style. 4K, photorealistic.",
        "variations": [
            "White baseball cap with red 'MEGA' embroidery, studio shot",
            "Clean white cap with red text and cross details, product photography"
        ]
    },
    "mega-black-gold": {
        "name": "MEGA Black & Gold",
        "prompt": "Professional product photography of a premium black baseball cap with gold metallic 'MEGA' embroidered text and small crown detail. Faux-suede finish, leather-style strap with gold buckle. Clean white background, studio lighting, front-facing angle, luxury product photography style. 4K, photorealistic.",
        "variations": [
            "Black suede baseball cap with gold 'MEGA' embroidery, studio shot",
            "Luxury black cap with gold text and crown detail, product photography"
        ]
    }
}

def generate_openai_images(api_key: str, output_dir: Path):
    """Generate images using OpenAI DALL-E 3."""
    try:
        from openai import OpenAI
    except ImportError:
        print("Error: openai package not installed. Run: pip install openai")
        return
    
    client = OpenAI(api_key=api_key)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    for product_id, config in PRODUCT_PROMPTS.items():
        print(f"\nGenerating: {config['name']}")
        
        try:
            response = client.images.generate(
                model="dall-e-3",
                prompt=config["prompt"],
                size="1024x1024",
                quality="standard",
                n=1,
            )
            
            # Download the image
            import requests
            image_url = response.data[0].url
            image_data = requests.get(image_url).content
            
            output_path = output_dir / f"{product_id}.png"
            with open(output_path, "wb") as f:
                f.write(image_data)
            
            print(f"  ✓ Saved: {output_path}")
            
        except Exception as e:
            print(f"  ✗ Error: {e}")

def generate_midjourney_prompts(output_dir: Path):
    """Output Midjourney-optimized prompts."""
    output_dir.mkdir(parents=True, exist_ok=True)
    
    prompts_file = output_dir / "midjourney-prompts.txt"
    
    with open(prompts_file, "w") as f:
        f.write("# Midjourney Prompts for MEGA Caps\n\n")
        f.write("Copy these into Midjourney Discord:\n\n")
        
        for product_id, config in PRODUCT_PROMPTS.items():
            f.write(f"\n## {config['name']}\n")
            f.write(f"```\n{config['prompt']} --ar 1:1 --v 6.1 --style raw\n```\n")
            f.write(f"Variations:\n")
            for var in config["variations"]:
                f.write(f"  - {var} --ar 1:1\n")
    
    print(f"Midjourney prompts saved to: {prompts_file}")
    
    # Also print to console
    print("\n" + "="*60)
    print("MIDJOURNEY PROMPTS")
    print("="*60)
    for product_id, config in PRODUCT_PROMPTS.items():
        print(f"\n{config['name']}:")
        print(f"{config['prompt']} --ar 1:1 --v 6.1 --style raw")

def generate_canva_prompts(output_dir: Path):
    """Output Canva-optimized prompts."""
    output_dir.mkdir(parents=True, exist_ok=True)
    
    prompts_file = output_dir / "canva-prompts.txt"
    
    with open(prompts_file, "w") as f:
        f.write("# Canva Magic Media Prompts for MEGA Caps\n\n")
        f.write("In Canva: Create a Design > Custom 1024x1024 > Apps > Magic Media\n\n")
        
        for product_id, config in PRODUCT_PROMPTS.items():
            f.write(f"\n## {config['name']}\n")
            f.write(f"Prompt:\n{config['prompt']}\n")
            f.write(f"Style: Photo\n")
            f.write(f"Aspect Ratio: 1:1\n")
            f.write("-" * 40 + "\n")
    
    print(f"Canva prompts saved to: {prompts_file}")

def main():
    parser = argparse.ArgumentParser(description="Generate MEGA Caps product images")
    parser.add_argument("--provider", choices=["openai", "midjourney", "canva"], 
                        required=True, help="AI image generation provider")
    parser.add_argument("--api-key", help="API key (required for OpenAI)")
    parser.add_argument("--prompts-only", action="store_true",
                        help="Only output prompts (for Midjourney/Canva)")
    parser.add_argument("--output-dir", default="~/clawd/projects/megacaps/images/products",
                        help="Output directory for images")
    
    args = parser.parse_args()
    
    output_dir = Path(args.output_dir).expanduser()
    
    if args.provider == "openai":
        if not args.api_key:
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                print("Error: --api-key or OPENAI_API_KEY env var required for OpenAI")
                return
        else:
            api_key = args.api_key
        
        if args.prompts_only:
            print("OpenAI prompts:")
            for pid, config in PRODUCT_PROMPTS.items():
                print(f"\n{config['name']}:")
                print(config["prompt"])
        else:
            generate_openai_images(api_key, output_dir)
    
    elif args.provider == "midjourney":
        generate_midjourney_prompts(output_dir)
    
    elif args.provider == "canva":
        generate_canva_prompts(output_dir)

if __name__ == "__main__":
    main()
