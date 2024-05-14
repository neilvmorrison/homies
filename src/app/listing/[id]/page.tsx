export default async function ListingDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <main>
      <h1>Listing Id: {id}</h1>
    </main>
  );
}
