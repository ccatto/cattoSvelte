<div class="mx-auto h-screen flex items-center fixed w-screen  z-50 bg-black bg-opacity-50 top-0">
	<div class="px-10 mx-auto">
		<div class="flex text-center items-center align-start">
			<div class="mb-20 flex">
				<span class="loader" />
			</div>
		</div>
	</div>
</div>

<style>
	.loader {
		width: 24px;
		height: 24px;
		box-shadow: 0 30px, 0 -30px;
		border-radius: 4px;
		background: currentColor;
		display: block;
		margin: -50px auto 0;
		position: relative;
		color: #fff;
		transform: translateY(30px);
		box-sizing: border-box;
		animation: animloader 2s ease infinite;
	}
	.loader::after,
	.loader::before {
		content: '';
		box-sizing: border-box;
		width: 24px;
		height: 24px;
		box-shadow: 0 30px, 0 -30px;
		border-radius: 4px;
		background: red;
		color: #fff;
		position: absolute;
		left: 30px;
		top: 0;
		animation: animloader 2s 0.2s ease infinite;
	}
	.loader::before {
		animation-delay: 0.3s;
		left: 60px;
	}

	@keyframes animloader {
		0% {
			top: 0;
			color: red;
		}
		50% {
			top: 30px;
			color: blue;
		}
		100% {
			top: 0;
			color: red;
		}
	}
</style>
