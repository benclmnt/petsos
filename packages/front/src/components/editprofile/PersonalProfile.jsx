import React, { Component } from 'react';

class PersonalProfile extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="mx-48 mt-20">
                <h1 className= "font-bold text-2xl text-center">Personal Information</h1>  
                <h2 className= "text-center mt-2">We won't share or display this on your profile</h2>

                <div className="flex justify-between mt-10">
                    <label>
                        <p className="mt-2 font-semibold ">Birthday</p>
                        <select type="text" name="name" className="border-gray-400 border-2 w-full rounded-md p-1">
                            <option value="">Month</option>
                            <option value="">January</option>
                            <option value="">February</option>
                            <option value="">March</option>
                            <option value="">April</option>
                            <option value="">May</option>
                            <option value="">June</option>
                            <option value="">July</option>
                            <option value="">August</option>
                            <option value="">September</option>
                            <option value="">October</option>
                            <option value="">November</option>
                            <option value="">December</option>
                        </select>    
                    </label>
                    <label>
                        <br/>
                        <input placeholder="Day" type="text" name="name" className="border-gray-400 border-2 h-fullw-full rounded-md p-1" />
                    </label>
                    <label>
                        <br/>
                        <input placeholder="Year" type="text" name="name" className="border-gray-400 border-2 w-full rounded-md p-1" />
                    </label>
                </div>
            </div>
         );
    }
}
 
export default PersonalProfile;