import React, { Component } from 'react';

class PhotoAndEmail extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="mx-48 mt-20 ">
                <div className="grid grid-cols-12">
                    <div className="col-span-9">
                        <p className="font-semibold">Required Profile Photo</p>
                        <p>This is the first photo pet owners will see. 
                            Build trust! Well-lit, clear frontal face photos (no sunglasses) 
                            are recommended. Recommended dimensions are 400 x 400 pixels</p>
                            <button onclick="" className="border-gray-400 border-2 px-2 py-1 mt-2 rounded-md">
                            <img src="https://img.icons8.com/fluent-systems-regular/24/000000/camera.png" ALIGN="left" className="mr-1"/> Upload Your Photo
                            </button>
                    </div>
                    <div className="col-span-3 border-gray-400 border-2 px-10 py-10">
                        <img src="https://www.flaticon.com/svg/static/icons/svg/21/21645.svg" alt="haha"/>
                    </div>
                </div>
            </div>
            
         );
    }
}
 
export default PhotoAndEmail;