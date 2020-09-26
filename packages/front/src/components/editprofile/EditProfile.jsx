import React from "react";
import Address from "./address";
import PersonalProfile from "./PersonalProfile";
import PhotoAndEmail from "./PhotoAndEmail";
import "./nav.css";
import "../Nav";

function EditProfile() {
  return (
    <div className="pt-20 mx-64 flex justify-center flex-col">
        <h1 className= "font-bold text-2xl text-center">Let's start with the basics</h1>      
        <Address />  
        <PhotoAndEmail />
        <PersonalProfile />
        <div className="flex justify-center">
            <button onclick="" className="text-white nav_bg w-1/6 py-1 mt-10 rounded-md">
                            Save & Continue
            </button>
        </div>
        
    </div>
  );
}

export default EditProfile;
