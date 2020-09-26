import React from 'react'

function DogWalk() {
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

            {/* Drop In Interval */}
            <div class="mt-8">
                <h1 class="mb-2 text-sm">How often do you need Dog Walking?</h1>
                <div class="flex mb-4 space-x-8">                            
                    <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="once"
                            placeholder="One Time" />

                    <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="repeat"
                            placeholder="Repeat Weekly" />
                </div>
            </div>

            {/* Dates */}
            <div class="mt-8">
                <h1 class="mb-2 text-sm">Which dates do you need?</h1>
                <div class="flex mb-4 space-x-8">                            
                    <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="dropoffdate"
                            placeholder="Start" />

                    <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="pickupdate"
                            placeholder="End" />
                </div>
            </div>
        </div>
    );

}

export default DogWalk;
