import CourseModel from '../models/courseModel'


export const createNewCourse = (item, file) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let courseItem = {
                title: item.title ,
                description: item.description ,
                videoDemo: item.videoDemo ,
                authorId: JSON.parse(item.authorId)  ,
                category: JSON.parse(item.category) ,
                level:JSON.parse(item.level) ,
                price: item.price ,
                discount:  item.discount,
                status:  item.status,
                image: file
            }
             let courseNew = await CourseModel.createNew(courseItem)  
      
              resolve(courseNew)
        } catch (error) {
            reject(error)
        }
      
      })
}

export const getListCoursePerspage = (skip, limit,protocol,host) =>{
    return new Promise(async (resolve, reject) => {
        try {
             let listCourse = await CourseModel.getListCoursePerspage(skip, limit)  
             let numOfCourse = await CourseModel.countTotalCourse();
                let courses =[]
             listCourse.map(item =>{

                courses =[...courses, {...item.toObject(),image:`${protocol}://${host}/images/courses/${item.toObject().image}`}]
             })
             let resCourse ={
                 courses,
                 total:numOfCourse
             }
              resolve(resCourse)
        } catch (error) {
            reject(error)
        }
      
      })
}
export const deleteCourse = (arrId) =>{
    return new Promise(async (resolve, reject) => {
        try {
             let itemRemove = await CourseModel.deleteCourse(arrId)  
              resolve(true)
        } catch (error) {
            reject(error)
        }
      
      })
}