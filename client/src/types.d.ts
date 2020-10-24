
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

  type ListProps = {
    list:any[],
    Component: (props: any) => React.ReactElement,
    Key:string
  }

  type CommentCounterProps = {
    count:number,
    projectId:number
  }
  
  
  
  type ProjectLayoutTypes = {
    lined:boolean
   }

   type id = number;


interface comment {
     id:number,
     text:string,
     date:string,
     postedBy: {
       id:number,
       name:string,
     },
   }
  
interface TechIcon  {
    id:number
    name:string
    filetype:string
    backgroundSize:string
    location:string
  }
  

interface projectProps  {
  id:number,
  title:string,
  href:string,
  date:string,
  imgUrl:string,
  github:string,
  description:string,
  likes: {
      id:number,
      user: {
          id:number,
      }
  },
  commentCount:number,
  techTags:any
}

interface projectQuery extends projectProps {
  tags: {
    id:number,
    name:number,
  },
  postedBy: {
    id:number,
    name:string,
  },
}