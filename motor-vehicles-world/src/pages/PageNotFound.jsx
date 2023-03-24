
export default function PageNotFound() {
  return (
    <body class="bg-gray-900">
   <div class="h-screen flex flex-col justify-center items-center">
    <h1 class="text-6xl font-bold text-gray-100 mb-4">404</h1>
    <h2 class="text-2xl font-bold text-gray-300 mb-4">Page not found</h2>
    <p class="text-gray-400 mb-8">Sorry, the page you are looking for does not exist.</p>
    <a href="/" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">Go back home</a>
  </div>
</body>
  );
}



