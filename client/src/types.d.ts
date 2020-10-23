
type PictureProps = {
    imgUrl:string,
    id:number
  }

  type TechStackProps ={
    icons:Array<any>
  }
  
  type DescriptionProps = {
    description:string
  }

  type IconProps = {
    location?:string
    className?:string
    backgroundSize?:string
  }

  type HeadlineProps = {
    id:number,
    href:string,
    title:string
  
  }
  

  type ProjectLayoutTypes = {
    lined:boolean
   }

  
interface TechIcon  {
    id:number
    name:string
    filetype:string
    backgroundSize:string
    location:string
  }
  