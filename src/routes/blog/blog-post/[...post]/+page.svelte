<!-- 
Install the "flowbite-typography" NPM package to apply styles and format the article content: 

URL: https://flowbite.com/docs/components/typography/ 
-->

<main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white antialiased">
	<div class="flex justify-between px-4 mx-auto max-w-screen-xl">
		<article
			class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue"
		>
			<header class="mb-4 lg:mb-6 not-format">
				<address class="flex items-center mb-6 not-italic">
					<div class="inline-flex items-center mr-3 text-sm text-gray-900">
						<img
							class="mr-4 w-16 h-16 rounded-full"
							src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
							alt="Chris Catto"
						/>
						<div>
							<a href="#" rel="author" class="text-xl font-bold text-gray-900">Chris Catto</a>
							<p class="text-base text-gray-500 text-gray-400">Dev at 365CarsShop</p>
							<p class="text-base text-gray-500 text-gray-400">
								<time datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2024</time>
							</p>
						</div>
					</div>
				</address>
				<h1
					class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl text-black"
				>
					Best practices for successful prototypes
				</h1>
			</header>
			<section class="text-black">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellat alias,
					suscipit nulla nisi, necessitatibus dolore vel provident, quaerat quos hic recusandae? A
					rerum natus expedita deleniti asperiores totam sequi.
				</p>
			</section>
			<section class="not-format">
				<div class="flex justify-between items-center mb-6 mt-10">
					<h2 class="text-lg lg:text-2xl font-bold text-gray-900 text-black">Discussion (20)</h2>
				</div>
				<form class="mb-6">
					<div
						class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 bg-gray-800 border-gray-700"
					>
						<label for="comment" class="sr-only">Your comment</label>
						<textarea
							id="comment"
							rows="6"
							class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 text-black placeholder-gray-400"
							placeholder="Write a comment..."
							required
						></textarea>
					</div>
					<button
						type="submit"
						class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-primary-800"
					>
						Post comment
					</button>
				</form>
			</section>
		</article>
	</div>
</main>

<section class="bg-white">
	<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
		<div class="mx-auto max-w-screen-md sm:text-center">
			<h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-black">
				Sign up for our newsletter
			</h2>
			<p class="mx-auto mb-8 max-w-2xl text-gray-500 md:mb-12 sm:text-xl text-gray-400">
				Stay up to date with the roadmap progress, announcements and exclusive discounts feel free
				to sign up with your email.
			</p>
			<form action="#">
				<div class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
					<div class="relative w-full">
						<label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 text-gray-300"
							>Email address</label
						>
						<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg
								class="w-4 h-4 text-gray-500 text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 16"
							>
								<path
									d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
								/>
								<path
									d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
								/>
							</svg>
						</div>
						<input
							class="block p-3 pl-9 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 border-gray-600 placeholder-gray-400 text-black focus:ring-primary-500 focus:border-primary-500"
							placeholder="Enter your email"
							type="email"
							id="email"
							required=""
						/>
					</div>
					<div>
						<button
							type="submit"
							class="py-3 px-5 w-full text-sm font-medium text-center text-black rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
							>Subscribe</button
						>
					</div>
				</div>
				<div
					class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer text-gray-300"
				>
					We care about the protection of your data. <a
						href="#"
						class="font-medium text-primary-600 text-primary-500 hover:underline"
						>Read our Privacy Policy</a
					>.
				</div>
			</form>
		</div>
	</div>
</section>
