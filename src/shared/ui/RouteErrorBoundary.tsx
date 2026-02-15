import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { Button } from './button'

export const RouteErrorBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        return <ErrorPage title="Unauthorized" description="Please sign in." />
      case 403:
        return <ErrorPage title="Forbidden" description="Access denied." />
      case 404:
        return <ErrorPage title="Not found" description="Page not found." />
      default:
        return <ErrorPage title="Error" description="Something went wrong." />
    }
  }

  return <ErrorPage title="Unexpected error" description="Something crashed." />
}

const ErrorPage = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <>
    <Header />
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <Button onClick={() => window.location.reload()}>Reload page</Button>
    </div>
  </>
)
