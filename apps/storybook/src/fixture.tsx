import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Component, Layers, Package, Zap } from "lucide-react"

export default function ComponentLibrary() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-white">
      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <section className="mb-16 md:mb-24">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 transition-colors">v1.0.0</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Build beautiful interfaces with our component library
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              A collection of high-quality React components built with Shadcn and Tailwind CSS. 
							The taste of Amar Jay
            </p>
            <div className="flex flex-wrap gap-4">
								<a href ="https://github.com/amar-jay/ui" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-black hover:bg-gray-200">
								Visit Repository
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
								</a>
            </div>
          </div>
        </section>

        <section className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Why use our components?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get started in minutes</h2>
            <p className="text-gray-400 mb-6">Visit the github repository 
							<a href="https://github.com/amar-jay/ui" className="text-blue-400 hover:underline"> here</a> and just 
							<code className="bg-gray-900 text-white mx-1 
							border-gray-700 *:border-solid border-2
							border-1 px-1 py-1">Ctrl+C</code> 
							and 
							<code className="bg-gray-900 text-white mx-1 
							border-gray-700 *:border-solid border-2
							border-1 px-1 py-1">Ctrl+V</code> 
							. That is all
						</p>
							Or Install the package and start building your UI with our components.
            <div className="bg-black rounded-md p-4 mb-6 overflow-x-auto">
              <code className="text-sm text-gray-300 cursor-pointer">npm install @amar-jay/ui</code>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


const features = [
  {
    title: "Accessible",
    description: "All components follow WAI-ARIA guidelines and support keyboard navigation and screen readers.",
    icon: Component,
  },
  {
    title: "Customizable",
    description: "Easily customize components to match your brand with Tailwind CSS utility classes.",
    icon: Layers,
  },
  {
    title: "Fast & Lightweight",
    description: "Optimized for performance with minimal bundle size and efficient rendering.",
    icon: Zap,
  },
  {
    title: "Dark Mode",
    description: "Built-in dark mode support with seamless transitions between light and dark themes.",
    icon: Code,
  },
  {
    title: "TypeScript",
    description: "Written in TypeScript with comprehensive type definitions for better developer experience.",
    icon: Code,
  },
  {
    title: "Open Source",
    description: "Free and open source under MIT license. Contributions are welcome.",
    icon: Package,
  },
]
