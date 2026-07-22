import React from "react";
import { useSelector } from "react-redux";

function CharacterCounter() {

  const content = useSelector(
    (state)=>state.post.content
  );

  const selectedPlatforms=useSelector(
    (state)=>state.post.selectedPlatforms
  );

  const limits={
    Twitter:280,
    Facebook:5000,
    Instagram:2200,
    LinkedIn:3000
  };

  let limit=5000;

  if(selectedPlatforms.length>0){

    limit=Math.min(

      ...selectedPlatforms.map(

        p=>limits[p]

      )

    );

  }

  const exceeded=content.length>limit;

  return(

    <div>

      <h3

      style={{

      color:exceeded?"red":"green"

      }}

      >

      Characters :

      {content.length}

      /

      {limit}

      </h3>

      {

      exceeded &&

      <h2 style={{color:"red"}}>

      ⚠ Character Limit Exceeded!

      </h2>

      }

    </div>

  );

}

export default CharacterCounter;