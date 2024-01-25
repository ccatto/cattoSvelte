<script>
	import AlgoliaMenuSelect from '$lib/Search/Algolia/AlgoliaMenuSelect.svelte';
	import RefinementFacet from '$lib/Search/Algolia/RefinementFacet.svelte';
</script>

<div class="col-grid-none pt-5 pb-1 overflow-y-auto">
	<div id="clear-refinements" />
</div>

<!-- Sidebar component, swap this element with another sidebar if you like -->

<div class="col-grid-none pt-5 pb-1 overflow-y-auto">
	<AlgoliaMenuSelect attribute="make" label="Make" />
</div>
<div class="col-grid-none pt-5 pb-1 overflow-y-auto">
	<AlgoliaMenuSelect attribute="model" label="Model" />
</div>
<div class="col-grid-none pt-5 pb-1 overflow-y-auto">
	<AlgoliaMenuSelect attribute="trim" label="Trim" />
</div>
<div class="col-grid-none pt-5 pb-1 overflow-y-auto">
	<RefinementFacet attribute="fuelDataFuelType" label="Fuel Type" />
</div>
<div class="col-grid-none pt-5 pb-1 overflow-y-auto">
	<RefinementFacet label="Drivetrain" attribute="drivetype" />
</div>
<div class="col-grid-none pt-5 pb-1 overflow-y-auto">
	<RefinementFacet label="Passenger Capacity" attribute="passengerCapacity" />
</div>
<div class="col-grid-none pt-5 pb-1 overflow-y-auto">
	<RefinementFacet label="Exterior Color" attribute="exteriorColor" />
</div>
