import "./tailwind.css"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


const queryClient = new QueryClient({});


export const decorators=[
  (story) => (
    <QueryClientProvider client={queryClient}>
      {story()}
    </QueryClientProvider>
  ),
]


window.public = {
  getStaffName: async (id) => {
    return `Firstname Lastname`
  }
}