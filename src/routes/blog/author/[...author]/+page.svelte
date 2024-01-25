<script>
	let author = {
	  name: 'Chris Catto',
	  bio: 'Full-stack developer, writer, and tech enthusiast.',
	  image: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg', // Provided image URL
	  socials: {
		twitter: 'https://twitter.com/janedoe',
		linkedin: 'https://linkedin.com/in/janedoe'
	  }
	};
  </script>
  
  <div class="min-h-screen bg-blue-50 flex items-center">
	<div class="container mx-auto px-4">
	  <div class="flex flex-wrap justify-center">
		<div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
		  <div class="relative">
			<img
			  alt="Author's portrait"
			  class="shadow-xl rounded-full align-middle border-none"
			  style="max-width: 150px;"
			  src={author.image}
			/>
		  </div>
		</div>
		<div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
		  <div class="py-6 px-3 mt-32 sm:mt-0">
			<button
			  class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1"
			  type="button"
			  style="transition: all 0.15s ease 0s;"
			>
			  Connect
			</button>
		  </div>
		</div>
		<div class="w-full lg:w-4/12 px-4 lg:order-1">
		  <div class="flex justify-center py-4 lg:pt-4 pt-8">
			<div class="mr-4 p-3 text-center">
			  <span class="text-xl font-bold block uppercase tracking-wide text-gray-700">22</span>
			  <span class="text-sm text-gray-500">Friends</span>
			</div>
			<div class="mr-4 p-3 text-center">
			  <span class="text-xl font-bold block uppercase tracking-wide text-gray-700">10</span>
			  <span class="text-sm text-gray-500">Photos</span>
			</div>
			<div class="lg:mr-4 p-3 text-center">
			  <span class="text-xl font-bold block uppercase tracking-wide text-gray-700">89</span>
			  <span class="text-sm text-gray-500">Comments</span>
			</div>
		  </div>
		</div>
	  </div>
	  <div class="text-center mt-12">
		<h3 class="text-4xl font-semibold leading-normal mb-2 text-gray-800">{author.name}</h3>
		<div class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
		  <i class="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
		  {author.bio}
		</div>
		<div class="mb-2 mt-10">
		  <a href={author.socials.twitter} class="text-gray-700 hover:text-gray-500 mx-4">
			<i class="fab fa-twitter"></i>
		  </a>
		  <a href={author.socials.linkedin} class="text-gray-700 hover:text-gray-500 mx-4">
			<i class="fab fa-linkedin"></i>
		  </a>
		</div>
	  </div>
	</div>
  </div>
  
