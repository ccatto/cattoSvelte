<script>
  export let condition, make, model, trim, leadImage, prices;
</script>

<div class="card w-96 bg-base-100 shadow-xl">
  <figure><img src={leadImage} alt={trim} /></figure>
  <div class="card-body">
    <h2 class="card-title">
      {condition}
      {make}
      {model}
      {trim}
      <div class="badge badge-secondary">Live</div>
    </h2>
    <p>{make}</p>
    <div class="card-actions justify-end items-baseline">
      <span class="text-sm">
        <span class="text-base font-black">{prices?.selling_price}</span>
        <span class="text-sm pr-1">/mo</span>
      </span>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
</div>
