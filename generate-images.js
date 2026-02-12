#!/usr/bin/env node
/**
 * MEGA Caps Image Generator
 * Generates hero images and logos using OpenAI DALL-E 3
 */

const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.join(__dirname, 'images', 'generated');
const PROVIDER = process.env.IMAGE_PROVIDER || 'openai'; // openai | replicate

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Hero image prompts - Regal but royalty-safe
const HERO_PROMPTS = [
  {
    id: 'hero-cross-linen',
    name: 'St George Cross - Aged Linen',
    prompt: `St George's Cross flag as a dramatic hero image, painted on aged linen canvas texture, billowing as if caught in wind, deep crimson red #C8102E on cream white, gold embroidered border detail, dramatic side lighting, museum heritage quality, cinematic composition, rich texture, English pride without institutional feel. Wide format 16:9.`,
    size: '1792x1024'
  },
  {
    id: 'hero-cross-metal',
    name: 'St George Cross - Painted Metal',
    prompt: `St George's Cross rendered as weathered painted metal sign, industrial iron texture with rust patina edges, deep crimson red cross on aged white background, riveted metal border, strong dramatic lighting from upper left, English heritage industrial aesthetic, bold and powerful, 16:9 wide format hero image.`,
    size: '1792x1024'
  },
  {
    id: 'hero-tudor-rose',
    name: 'Tudor Rose Heraldry',
    prompt: `Single Tudor rose in centre frame, symmetrical heraldic composition, deep crimson red and pure white petals, rich gold centre, dark navy background #012169, regal English heritage style, illuminated manuscript quality, dramatic lighting, premium luxury feel, 16:9 hero banner format, embroidered texture suggested, no text.`,
    size: '1792x1024'
  },
  {
    id: 'hero-lion',
    name: 'Heraldic Lion',
    prompt: `Golden heraldic lion in profile facing left, stylised medieval illustration style, deep crimson red background, gold lion #D4A843, bold clean lines, English heraldic manuscript inspired, symmetrical and centred, dramatic lighting from upper left, heritage luxury aesthetic, 16:9 hero format, no crown elements, regal but not royal.`,
    size: '1792x1024'
  },
  {
    id: 'hero-oak-wreath',
    name: 'English Oak Wreath',
    prompt: `Regal wreath of English oak leaves and acorns, deep forest green and antique gold, symmetrical circular wreath, dark navy centre area for text overlay, heritage English symbolism, premium embroidered texture, dramatic lighting, 16:9 hero banner, luxury brand aesthetic, no crown, timeless quality.`,
    size: '1792x1024'
  }
];

// Logo prompts for caps - 1:1 square format
const LOGO_PROMPTS = [
  {
    id: 'logo-mega-block',
    name: 'MEGA Block Logo',
    prompt: `Logo design for baseball cap. Bold text "MEGA" in ultra-bold condensed sans-serif font. Red fill #C8102E with thin white outline. Clean flat vector style, centred composition, suitable for embroidery. White background. English patriotic design, streetwear aesthetic.`,
    size: '1024x1024'
  },
  {
    id: 'logo-cross-shield',
    name: 'Cross Shield Logo',
    prompt: `Logo design for baseball cap. Bold text "MEGA" with St George's Cross red and white shield behind it. Clean flat vector style, no gradients, suitable for embroidery. White background. Patriotic English design, centred composition.`,
    size: '1024x1024'
  },
  {
    id: 'logo-old-english',
    name: 'Old English Gothic',
    prompt: `Baseball cap logo: "MEGA" in ornate Old English blackletter gothic font. Deep navy blue #012169 text with thin gold #D4A843 outline. No background imagery, just the typography. Clean and bold, embroidery-ready, centred.`,
    size: '1024x1024'
  },
  {
    id: 'logo-crown-simple',
    name: 'Crown Above MEGA',
    prompt: `Baseball cap logo: a simple stylised crown icon above bold text "MEGA". Red #C8102E and gold #D4A843 colour scheme. Clean flat vector, symmetrical, centred composition. Embroidery-ready, 3-colour maximum. Generic heraldic crown, not specific royal crown.`,
    size: '1024x1024'
  },
  {
    id: 'logo-tudor-rose',
    name: 'Tudor Rose Badge',
    prompt: `Tudor rose icon above bold text "MEGA". Red and white rose, navy text. Classic English heritage symbol. Clean vector logo for baseball cap embroidery, 3-colour maximum, centred composition, white background.`,
    size: '1024x1024'
  }
];

// Combine all prompts
const ALL_PROMPTS = [
  ...HERO_PROMPTS.map(p => ({ ...p, type: 'hero' })),
  ...LOGO_PROMPTS.map(p => ({ ...p, type: 'logo' }))
];

async function generateOpenAI(prompt, outputPath) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not set');
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: prompt.prompt,
      size: prompt.size,
      quality: 'standard',
      n: 1
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const imageUrl = data.data[0].url;
  const revisedPrompt = data.data[0].revised_prompt;

  // Download image
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    throw new Error(`Failed to download image: ${imageResponse.statusText}`);
  }

  const buffer = await imageResponse.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));

  return { path: outputPath, revisedPrompt };
}

async function generateReplicate(prompt, outputPath) {
  const apiKey = process.env.REPLICATE_API_TOKEN;
  if (!apiKey) {
    throw new Error('REPLICATE_API_TOKEN not set');
  }

  // Using SDXL on Replicate
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      version: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
      input: {
        prompt: prompt.prompt,
        width: prompt.size === '1792x1024' ? 1792 : 1024,
        height: prompt.size === '1792x1024' ? 1024 : 1024,
        num_outputs: 1,
        scheduler: 'K_EULER',
        num_inference_steps: 50,
        guidance_scale: 7.5
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Replicate API error: ${error.detail || response.statusText}`);
  }

  const prediction = await response.json();
  console.log(`  Prediction started: ${prediction.id}`);
  console.log(`  Waiting for completion...`);

  // Poll for completion
  let result = prediction;
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    await new Promise(r => setTimeout(r, 1000));
    const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
      headers: { 'Authorization': `Token ${apiKey}` }
    });
    result = await pollResponse.json();
  }

  if (result.status === 'failed') {
    throw new Error(`Generation failed: ${result.error}`);
  }

  // Download image
  const imageUrl = result.output[0];
  const imageResponse = await fetch(imageUrl);
  const buffer = await imageResponse.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));

  return { path: outputPath, revisedPrompt: null };
}

async function generateImage(prompt) {
  const filename = `${prompt.id}.png`;
  const outputPath = path.join(OUTPUT_DIR, filename);

  // Skip if already exists
  if (fs.existsSync(outputPath) && !process.env.FORCE_REGENERATE) {
    console.log(`  ⏭️  Skipping ${prompt.name} (already exists)`);
    return { path: outputPath, skipped: true };
  }

  console.log(`\n🎨 Generating: ${prompt.name}`);
  console.log(`   Type: ${prompt.type} | Size: ${prompt.size}`);

  const startTime = Date.now();
  let result;

  try {
    if (PROVIDER === 'openai') {
      result = await generateOpenAI(prompt, outputPath);
    } else if (PROVIDER === 'replicate') {
      result = await generateReplicate(prompt, outputPath);
    } else {
      throw new Error(`Unknown provider: ${PROVIDER}`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`   ✅ Saved: ${filename} (${duration}s)`);
    if (result.revisedPrompt) {
      console.log(`   📝 Revised prompt: ${result.revisedPrompt.substring(0, 100)}...`);
    }

    return { ...result, skipped: false };
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    throw error;
  }
}

async function main() {
  console.log('🦾 MEGA Caps Image Generator\n');
  console.log(`Provider: ${PROVIDER}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  // Check for API key
  const apiKeyVar = PROVIDER === 'openai' ? 'OPENAI_API_KEY' : 'REPLICATE_API_TOKEN';
  if (!process.env[apiKeyVar]) {
    console.error(`❌ Error: ${apiKeyVar} not set`);
    console.error(`\nSet it with: export ${apiKeyVar}=your_key_here`);
    process.exit(1);
  }

  // Parse arguments
  const args = process.argv.slice(2);
  const specificId = args.find(arg => !arg.startsWith('--'));
  const generateHeroes = args.includes('--heroes') || args.includes('--all') || (!specificId && !args.includes('--logos'));
  const generateLogos = args.includes('--logos') || args.includes('--all') || (!specificId && !args.includes('--heroes'));

  // Filter prompts
  let promptsToGenerate = ALL_PROMPTS;
  if (specificId) {
    promptsToGenerate = ALL_PROMPTS.filter(p => p.id === specificId);
    if (promptsToGenerate.length === 0) {
      console.error(`❌ Unknown prompt ID: ${specificId}`);
      console.error(`Available IDs: ${ALL_PROMPTS.map(p => p.id).join(', ')}`);
      process.exit(1);
    }
  } else if (!generateHeroes) {
    promptsToGenerate = ALL_PROMPTS.filter(p => p.type === 'logo');
  } else if (!generateLogos) {
    promptsToGenerate = ALL_PROMPTS.filter(p => p.type === 'hero');
  }

  console.log(`Generating ${promptsToGenerate.length} image(s)...\n`);

  const results = [];
  for (const prompt of promptsToGenerate) {
    try {
      const result = await generateImage(prompt);
      results.push({ ...result, prompt, success: true });
    } catch (error) {
      results.push({ prompt, success: false, error: error.message });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Generation Summary');
  console.log('='.repeat(50));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);

  if (successful.length > 0) {
    console.log('\nGenerated files:');
    successful.forEach(r => {
      const status = r.skipped ? '(skipped - exists)' : '(new)';
      console.log(`  • ${r.prompt.id}.png ${status}`);
    });
  }

  if (failed.length > 0) {
    console.log('\nFailed:');
    failed.forEach(r => {
      console.log(`  • ${r.prompt.id}: ${r.error}`);
    });
    process.exit(1);
  }

  console.log(`\n💰 Estimated cost: $${(successful.filter(r => !r.skipped).length * (PROVIDER === 'openai' ? 0.08 : 0.02)).toFixed(2)}`);
  console.log('\nDone! 🎉');
}

// Show help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
MEGA Caps Image Generator

Usage:
  node generate-images.js [options] [prompt-id]

Options:
  --heroes        Generate only hero images
  --logos         Generate only logo images
  --all           Generate all images (default)
  --help, -h      Show this help

Environment:
  OPENAI_API_KEY       Required for OpenAI provider
  REPLICATE_API_TOKEN  Required for Replicate provider
  IMAGE_PROVIDER       'openai' (default) or 'replicate'
  FORCE_REGENERATE     Set to regenerate existing images

Examples:
  # Generate all images with OpenAI
  export OPENAI_API_KEY=sk-xxx
  node generate-images.js

  # Generate only hero images
  node generate-images.js --heroes

  # Generate specific image
  node generate-images.js hero-cross-linen

  # Use Replicate instead
  export REPLICATE_API_TOKEN=r8_xxx
  export IMAGE_PROVIDER=replicate
  node generate-images.js
`);
  process.exit(0);
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
