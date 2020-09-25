import React from 'react'

function Boarding() {
    return (
        <div>
            {/* Address */}
            <div class="mt-8">
            <h1 class="mb-2 text-sm">What's your address or cross-streets?</h1>
            <input 
                    type="text"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="address" />

        </div>

        {/* Dates */}
        <div class="mt-8">
            <h1 class="mb-2 text-sm">Which dates do you need?</h1>
            <div class="flex mb-4 space-x-8">                            
            <input 
                    type="text"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="dropoffdate"
                    placeholder="Drop off" />

            <input 
                    type="text"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="pickupdate"
                    placeholder="Pick Up" />
            </div>

        </div>
     </div>
    );
}

export default Boarding;
