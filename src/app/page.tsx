import { supabase } from '@/lib/supabase'
import React from 'react'

const page = () => {

  const setNewView = async () => {
    const {data,error} = await supabase
    .from('views')
    .insert({
      name: "random name",
    })

    if(data) console.log(data);
    if(error) console.log(error);
    
  }

  setNewView();

  return (
    <div>
      Namaste!
    </div>
  )
}

export default page
