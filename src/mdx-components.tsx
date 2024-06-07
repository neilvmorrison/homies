import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-slate-700 lg:text-3xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 text-2xl text-slate-600 font-extrabold tracking-tight lg:text-2xl">
        {children}
      </h2>
    ),
    p: ({ children }) => <p className="leading-7 mb-4 text-sm">{children}</p>,
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-sm">{children}</ol>
    ),
    ...components,
  }
}
