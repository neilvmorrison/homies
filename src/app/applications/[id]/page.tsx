function ApplicationDetail({ params }: { params: { id: string } }) {
  return <div>This is application detail for app {params.id}</div>
}

export default ApplicationDetail
