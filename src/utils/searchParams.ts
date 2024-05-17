export function buildQueryString(
  searchParams: URLSearchParams,
  name: string,
  value: string
) {
  const params = new URLSearchParams(searchParams.toString())
  params.set(name, value)

  return params.toString()
}
