package travelstudio.control.json;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import travelstudio.domain.Picture;
import travelstudio.service.PictureService;




@RestController
@RequestMapping("/picture/")
public class PictureControl {
  
  @Autowired ServletContext servletContext;
  @Autowired PictureService pictureService;
  

  @RequestMapping("add")
  public String add(String filename) throws Exception {
    pictureService.add(filename);
    
    return "a";
    
  }  
  @RequestMapping("selectByPost")
  public Object selectByPost(String[] pictureno) throws Exception{
    List<Picture> fileList = new ArrayList();
    
    for(int i=0; i<pictureno.length;i++){
      
      
      fileList.add(pictureService.selectByPost(pictureno[i]));
      System.out.println(pictureService.selectByPost(pictureno[i]));
      System.out.println(pictureno.length);
    }
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("fileList", fileList);
    return resultMap;
  }
  
  @RequestMapping("searchthispicture")
  public Object searchthispicture(String[] path) throws Exception {
    System.out.println("넘어오는파일");
    List<Picture> pictureList = new ArrayList<>();
    for(int i=0; i<path.length;i++){
      pictureList.add(pictureService.searchthispicture(path[i]));
    }
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("pictureList", pictureList);
    return resultMap;
    
  }  
  
  @RequestMapping("delete")
  public Object delete(String[] deletePhoto) throws Exception {
    
    List<Picture> deleteList = new ArrayList<>();
    for(int i = 0; i < deletePhoto.length; i++) {
      System.out.println((pictureService.searchPicNo(deletePhoto[i])));
      deleteList.add(pictureService.searchPicNo(deletePhoto[i]));
    }
    
    System.out.println(deleteList);
    
    for(int j = 0; j < deleteList.size();j++) {
//      System.out.printf("deleteList.get(j).getPicno(),%d", deleteList.get(j).getPicno());
      pictureService.delete(deleteList.get(j).getPicno());
    }
//    for(int j = 0; j < deletePhoto.length; j++) {
//    pictureService.delete(deletePhoto[j]);
//    }
//    System.out.println(deleteList);
    
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
}









