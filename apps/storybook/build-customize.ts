// copy-mountPlayground.js
import { readFile, writeFile } from "fs/promises";

// Input and output HTML file paths
const inputPath = "./cosmos-export/index.html";

async function extractMountPlaygroundScript() {
  try {
    const html = await readFile(inputPath, "utf-8");

    // Match <script>...</script> block where content starts with mountPlayground(
    const match = html.match(/<script\b[^>]*>\s*mountPlayground\([^<]*<\/script>/);

    if (match) {
      const scriptTag = match[0];
			await writeHTMLFile(scriptTag);
      console.log("Script tag copied successfully.");
    } else {
      console.error("No matching script tag found.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

async function writeHTMLFile(mountPlaygroundScript:string, url="https://ui.amarjay.com/") {
	const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Title and description -->
    <title>Amar Jay UI</title>
    <meta name="description" content="Amar Jay UI Component Library offers a comprehensive suite of modern, customizable UI components for React applications, designed to boost productivity and enhance user experience." />

    <!-- Keywords for SEO -->
    <meta name="keywords" content="UI components, React UI library, Amar Jay, customizable UI components, frontend development, React components, web design, user interface, UI toolkit" />

    <!-- Author info -->
    <meta name="author" content="Amar Jay" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/icon.ico" />

    <!-- Open Graph for social sharing -->
    <meta property="og:title" content="Amar Jay UI Component Library" />
    <meta property="og:description" content="A modern React UI component library with customizable, accessible components for web developers." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}/" />
    <meta property="og:image" content="${url}/logo.png" />

    <!-- Twitter Card data -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Amar Jay UI Component Library" />
    <meta name="twitter:description" content="Build stunning web apps faster with Amar Jays React UI components." />
    <meta name="twitter:image" content="${url}/logo.png" />
    <meta name="twitter:creator" content="@amarjay" />

    <!-- Robots -->
    <meta name="robots" content="index, follow" />

    <!-- Language -->
    <meta http-equiv="Content-Language" content="en" />

    <!-- Canonical URL -->
    <link rel="canonical" href="${url}/" />
		<!-- // vite pre-build script -->
		<script>
		  document.addEventListener('DOMContentLoaded', function () {
		    if (window.location.pathname === '/' && !window.location.search) {
		      window.location.replace('/?fixtureId={"path"%3A"src%2Ffixture.tsx"}');
		    }
		  });
		</script>

    <!-- Schema.org structured data for better indexing -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Amar Jay UI Component Library",
      "url": "${url}/",
      "logo": "${url}/logo.png",
      "description": "A modern React UI component library with customizable, accessible components for web developers.",
      "applicationCategory": "DeveloperTool",
      "operatingSystem": "All",
      "author": {
        "@type": "Person",
        "name": "Amar Jay"
      }
    }
    </script>

  </head>
  <body>
    <div id="root"></div>
    <script src="playground.bundle.js"></script>
		${mountPlaygroundScript}
  </body>
</html>
`

	await writeFile(inputPath, htmlContent, "utf-8");
	console.log("HTML file written successfully.");
}


extractMountPlaygroundScript();
