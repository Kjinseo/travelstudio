/* Spring WebMVC: JSON 콘텐츠로 응답하기 + 파일 업로드 + thumbnail 파일 생성
 * => AJAX 파일 업로드
 * 
 */
package travelstudio.control.json;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.drew.metadata.exif.GpsDirectory;
import com.drew.metadata.file.FileMetadataDirectory;

import net.coobird.thumbnailator.Thumbnails;
import travelstudio.control.json.FileControl.AscendingObj;
import travelstudio.control.json.FileControl.SortAscendingObj;
import travelstudio.domain.Detail;
import travelstudio.domain.Member;
import travelstudio.domain.Picture;
import travelstudio.service.DetailService;
import travelstudio.service.PictureService;

@RestController
@RequestMapping("/File/") 
public class FileControl {
  
  @Autowired ServletContext ctx;
  @Autowired PictureService pictureService;
  @Autowired DetailService detailService;
  

  @RequestMapping(path="upload")
  public Object upload(MultipartFile[] files, HttpServletRequest req) throws Exception {
    HttpServletRequest httpRequest= (HttpServletRequest) req;
    Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
    ArrayList<Object> fileList = new ArrayList<>();
    for (int i = 0; i < files.length; i++) {
      if (files[i].isEmpty()) 
        continue;
      
      String newFilename = this.getNewFilename();
      File file = new File(ctx.getRealPath("/upload/" + newFilename));
      System.out.println(file);
//      System.out.println();
      files[i].transferTo(file);
      pictureService.add("/upload/" + newFilename);
      /*      List<Picture> picNoList = pictureService.selectPicNo("/upload/" + newFilename);
      
      System.out.println(loginMember.getEmail());
      Detail detail = new Detail();
      detail.setPicno(picNoList.get(0).getPicno());
      detail.setWriter(loginMember.getEmail());
      detail.setSrtno(srtno);
      detailService.sadd(detail);*/
      
      File thumbnail = new File(ctx.getRealPath("/upload/" + newFilename + "_700"));
      Thumbnails.of(file).size(761, 606).outputFormat("png").toFile(thumbnail); 

     
        
      HashMap<String,Object> fileMap = new HashMap<>();
      fileMap.put("filename", "/upload/" + newFilename);
      fileMap.put("filesize", files[i].getSize());
      fileList.add(fileMap);
    }
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("fileList", fileList);
    return resultMap;
  }
  


  
  @RequestMapping(path="upload3")
  public Object upload3(MultipartFile[] files, HttpServletRequest req) throws Exception {
    HttpServletRequest httpRequest= (HttpServletRequest) req;
    Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
    ArrayList<Object> fileList = new ArrayList<>();
    ArrayList<Picture> sortList = new ArrayList<>();
//    System.out.println(files.length);
    for (int i = 0; i < files.length; i++) {
//      File fileMetadata= files[i];
      if (files[i].isEmpty()) 
        continue;
    
      String newFilename = this.getNewFilename();
      File file = new File(ctx.getRealPath("../upload/" + newFilename));
      files[i].transferTo(file);
      
/*      File thumbnail = new File(ctx.getRealPath("/upload/" + newFilename + "_200"));
      Thumbnails.of(file).size(200, 200).outputFormat("png").toFile(thumbnail);*/
      
      File thumbnail = new File(ctx.getRealPath("../upload/" + newFilename + "_300"));
      Thumbnails.of(file).size(300, 300).outputFormat("png").toFile(thumbnail);
      
/*      thumbnail = new File(ctx.getRealPath("/upload/" + newFilename + "_400"));
      Thumbnails.of(file).size(400, 400).outputFormat("png").toFile(thumbnail);
      
      thumbnail = new File(ctx.getRealPath("/upload/" + newFilename + "_500"));
      Thumbnails.of(file).size(500, 500).outputFormat("png").toFile(thumbnail);*/
      
      thumbnail = new File(ctx.getRealPath("../upload/" + newFilename + "_600"));
      Thumbnails.of(file).size(600, 600).outputFormat("png").toFile(thumbnail);
      
//      System.out.println(file);
      
      Picture picture = new Picture();
      Metadata metadata = ImageMetadataReader.readMetadata(file);
      picture.setPath("../upload/" + newFilename);
      
/*      for (Directory directory1 : metadata.getDirectories()) {
        System.out.println(directory1.getTags());
          for (Tag tag : directory1.getTags()) {
              System.out.format("zz[%s] - %s = %s\n",
                  directory1.getName(), tag.getTagName(), tag.getDescription());
          }
          if (directory1.hasErrors()) {
              for (String error : directory1.getErrors()) {
                  System.err.format("zzERROR: %s", error);
              }
          }
      }*/
      
      GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);
      ExifSubIFDDirectory directory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
      FileMetadataDirectory fileDirectory = metadata.getFirstDirectoryOfType(FileMetadataDirectory.class);
//      System.out.println(metadata.getFirstDirectoryOfType(FileMetadataDirectory.class) + "뭔데");

      try {
      if (gpsDirectory != null) {
        picture.setLati(gpsDirectory.getGeoLocation().getLatitude());
        picture.setLongit(gpsDirectory.getGeoLocation().getLongitude());
      } else {
        picture.setLati(null);
        picture.setLongit(null);
      }
      } catch (Exception e) {
        picture.setLati(null);
        picture.setLongit(null);
      }
      
      Date date = null;
      
      if (directory == null) {
        date = fileDirectory.getDate(FileMetadataDirectory.TAG_FILE_MODIFIED_DATE);
      } else {
//       찍은 날짜가 있는 경우
        date = directory.getDate(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL);

        if ( date != null) {
  //        date = directory.getDate(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL);
//          System.out.println(date);
          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
          String metaDateTime = sdf.format(date);
//          System.out.println(metaDateTime);
          picture.setTime(metaDateTime);
          
        } else if(directory.getDate(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL) == null) {
          if (directory.getDate(ExifSubIFDDirectory.TAG_DATETIME_DIGITIZED) != null) {
            date = directory.getDate(ExifSubIFDDirectory.TAG_DATETIME_DIGITIZED);       
          } else {
            date = fileDirectory.getDate(FileMetadataDirectory.TAG_FILE_MODIFIED_DATE);
          }
        } 
      }
      
      System.out.println(date);
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      String metaDateTime = sdf.format(date);
//      System.out.println(metaDateTime);
      picture.setTime(metaDateTime);
      
      sortList.add(picture);
      
      System.out.printf("sortList 가공전 ========>");
      System.out.println(sortList);
      //pictureService.add(picture);
      
      /*
 List<Picture> picNoList = pictureService.selectPicNo("/upload/" + newFilename);
      
      Detail detail = new Detail();
      detail.setPicno(picNoList.get(0).getPicno());
      detail.setWriter(loginMember.getEmail());
      detailService.sadd(detail);
//      System.out.println(loginMember.getEmail());
      
      File thumbnail = new File(ctx.getRealPath("/upload/" + newFilename + "_700"));
      Thumbnails.of(file).size(761, 506).outputFormat("png").toFile(thumbnail); 

     
        
      HashMap<String,Object> fileMap = new HashMap<>();
      fileMap.put("filename", newFilename);
      fileMap.put("filesize", files[i].getSize());
      fileList.add(fileMap);*/
    }
    // 날짜순 정렬
    AscendingObj ascending = new AscendingObj();
    
    Collections.sort(sortList, ascending);
    
    int sortno=0;
    sortList.get(0).setSortno(sortno);
//    pictureService.add(sortList.get(0));
    
    
    ArrayList<Picture> GPSNullList = new ArrayList<>();
    
    // gps정보 없는 사진들 GPSNullList로 빼기
    for(int sortGetNo=0; sortGetNo < sortList.size(); sortGetNo++) {
      if(sortList.get(sortGetNo).getLati() == null || sortList.get(sortGetNo).getLongit() == null) {
        GPSNullList.add(sortList.get(sortGetNo));
      }
    }
    
    sortList.removeAll(GPSNullList);
    System.out.printf("======>GPSNullList");
    System.out.println(GPSNullList);
    System.out.printf("======>sortList");
    System.out.println(sortList);
    // gps정보 없는 사진들 GPSNullList로 빼기 끝
    
    if (sortList.size() == 0) {
      for(int i = 0; i < GPSNullList.size(); i++) {
        sortList.add(GPSNullList.get(i));
      }

      
      for (int j=1;j < sortList.size(); j++) {
//      System.out.println(sortList.get(i));
      if ((sortList.get(j-1).getTime()).equals(sortList.get(j).getTime())) {
        sortList.get(j).setSortno(sortno);

      }else{  
        sortno+=1;
        sortList.get(j).setSortno(sortno);
        System.out.println(sortList.get(j));
      }
      
      System.out.printf("모두 null일때=====>");
      System.out.println(sortList);
      ascending = new AscendingObj();
      Collections.sort(sortList, ascending);
    }
//    } else if(sortList.size() == 1) {  
    } else {
      
    
    for (int i=1;i < sortList.size(); i++) {
//      System.out.println(sortList.get(i));
      if ((sortList.get(i-1).getTime()).equals(sortList.get(i).getTime())) {
        sortList.get(i).setSortno(sortno);

      }else{  
        sortno+=1;
        sortList.get(i).setSortno(sortno);
        System.out.println(sortList.get(i));
      }
//      pictureService.add(sortList.get(i));
    }
    
    
    System.out.println("sortno 준 직후=====>");
    System.out.println(sortList);
    
    
ArrayList<Integer> sortArray2 = new ArrayList<>();

// GPS 
    for(int k=0; k<sortList.size();k++){
      int countSort = 0;
      ArrayList<Integer> sortArray = new ArrayList<>();
      sortArray.add(0, 0);
      // 0번은 3개 1번은 3개 2번은 2개 3번은 1개 갯수세기
      for(int i = 0; i<sortList.size(); i++) {
        if(sortList.get(i).getSortno()== countSort) {
          sortArray.set(countSort, sortArray.get(countSort)+1);
        } else{
          countSort +=1;
          sortArray.add(countSort,0);
          sortArray.set(countSort,sortArray.get(countSort)+1);
        }
      }    // 0번은 3개 1번은 3개 2번은 2개 3번은 1개 갯수세기 끝
    
  
    if(k==0){
      sortArray2=sortArray;
    }
    
    System.out.println(sortList);
    
    
    double lat1 = 0;
    double lon1 = 0;
    double lat2;
    double lon2;
    double distanceKiloMeter;
    
    int value=0;
    int backStartPoint=sortArray.get(0);
    int change=0;
    
    
    // sortArray
    for(int sortArrayLength = 0; sortArrayLength < sortArray.size(); sortArrayLength++) {
      System.out.println(sortArray.size());
      // 1이면 할필요가 없다. 1 초과일 때만.
      if(sortArray.get(sortArrayLength)>1){
      value=0;
      backStartPoint=sortArray.get(0);
      // if 위치정보 기준객체 설정
      if(sortArrayLength==0){
        backStartPoint=sortArray.get(0);
        value=0;
        lat1 = sortList.get(sortArrayLength).getLati();
        lon1 = sortList.get(sortArrayLength).getLongit();
      }else{
        for(int j=1; j<sortArrayLength+1;j++){
          
            value+=sortArray.get(j-1);
            System.out.println("value==========>");
            System.out.println(value);
          
            backStartPoint+=sortArray.get(j);
            System.out.println("backStartPoint======>");
            System.out.println(backStartPoint);
            if(sortList.get(value).getLati()!=null&&sortList.get(value).getLongit()!=null){
            lat1 = sortList.get(value).getLati();
            lon1 = sortList.get(value).getLongit();
            }
        }
        
      }
      // if 위치정보 기준객체 설정 끝
      
      
     double kilo1=1.0;
      //위치정보 비교하고 1키로 안에 들어가면 그대로 두고 아니라면 1증가시킨다
      for (int target = value+1; target < backStartPoint; target++) {
        if(sortList.get(target).getLati()!=null&&sortList.get(target).getLongit()!=null){
        lat2 = sortList.get(target).getLati();
        lon2 = sortList.get(target).getLongit();
        distanceKiloMeter=distance(lat1, lon1, lat2, lon2, "kilometer");
        System.out.println(distanceKiloMeter);
        if(distanceKiloMeter > kilo1) {
          System.out.println("distanceKiloMeter==>");
          if(change==0){
            System.out.println("distanceKiloMeter==>if");
            for(int l = backStartPoint; l < sortList.size(); l++ ) {
              // 다음 sortno부터 sortno값 +1
              sortList.get(l).setSortno(sortList.get(l).getSortno()+1); 
          } // l for문
            change=1;
            // 값이 다른 대상의 sortno +1
        }
          sortList.get(target).setSortno(sortList.get(target).getSortno()+1);
        }
      } 
      } // for - target for문
      change= 0;
      } // if - 1초과 if문
      
    } // for - sortArrayLength for문
    
    SortAscendingObj ascendingSortno = new SortAscendingObj();
    Collections.sort(sortList, ascendingSortno);
    } // for - GPS 정렬 for 문
    System.out.printf("null값 처리 적용 전====>");
    System.out.println(GPSNullList);
    System.out.println(sortList);
    int change = 0;
//    int pushAddArray = 0;
    int value=0;
    int newSortNo=0;
    for(int nullCompare = 0; nullCompare < GPSNullList.size(); nullCompare++) {
      if(GPSNullList.get(nullCompare).getTime().compareTo(sortList.get(0).getTime()) < 0) {
          for(int l = 0; l < sortList.size(); l++ ) {
            sortList.get(l).setSortno(sortList.get(l).getSortno()+1);
          } // l for문
        GPSNullList.get(nullCompare).setSortno(0);
        sortList.add(GPSNullList.get(nullCompare));
      } // if( < 0)
      else if(GPSNullList.get(nullCompare).getTime().compareTo(sortList.get(sortList.size()-1).getTime()) > 0) {
        GPSNullList.get(nullCompare).setSortno(sortList.get(sortList.size()-1).getSortno()+1);
        sortList.add(GPSNullList.get(nullCompare));
      } // else if ( >0)
      else if (GPSNullList.get(nullCompare).getTime().compareTo(sortList.get(sortList.size()-1).getTime()) ==0) {
        GPSNullList.get(nullCompare).setSortno(sortList.get(sortList.size()-1).getSortno());
        sortList.add(GPSNullList.get(nullCompare));
      }
      else {
        int change2=0;
        
        for(int i = 0; i < sortList.size()-1; i++) {
            System.out.printf("%d for문안에서 sortList=====>",nullCompare);
          System.out.println(sortList.size());
         if(change2==0){
         if(GPSNullList.get(nullCompare).getTime().compareTo(sortList.get(i).getTime()) < 0) {
           if(GPSNullList.get(nullCompare).getTime().compareTo(sortList.get(i-1).getTime()) == 0 && sortList.get(i-1).getLati()==null 
               && sortList.get(i-1).getLongit()==null && i > 0) {
             GPSNullList.get(nullCompare).setSortno(sortList.get(i-1).getSortno());
             sortList.add(GPSNullList.get(nullCompare));
             change2=1;
             break;
           } else {
           GPSNullList.get(nullCompare).setSortno(newSortNo+1);
           sortList.add(GPSNullList.get(nullCompare));
           
           sortList.get(i).setSortno(sortList.get(i).getSortno()+1);
           
           change2=1;
           continue;
           }
         } else if(GPSNullList.get(nullCompare).getTime().compareTo(sortList.get(i).getTime()) == 0) {
           newSortNo=sortList.get(i).getSortno();
           continue;
         } else {
           newSortNo=sortList.get(i).getSortno();
           continue;
         }
          }else{
            sortList.get(i).setSortno(sortList.get(i).getSortno()+1);
          }
        }
      }
      SortAscendingObj ascendingNewSort = new SortAscendingObj();
      
      Collections.sort(sortList, ascendingNewSort);
      System.out.printf("for문끝날때 sortlist 확인용=====>");
      System.out.println(sortList);
      
    } //for nullCompare
    }
    System.out.printf("null값 적용===>");
//    System.out.println(GPSNullList);
    System.out.println(sortList);
    
    System.out.print("Point 오름차순 - ");
    for (Picture p : sortList) {
        System.out.print(p);
    }
    
    for (int i = 0; i < sortList.size(); i++) {
    pictureService.addAllPicture(sortList.get(i));
    }
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("fileList", fileList);
    return sortList;
  }
  
  int count = 0;
  synchronized private String getNewFilename() {
    if (count > 100) {
      count = 0;
    }
    return String.format("%d_%d", System.currentTimeMillis(), ++count); 
  }
  
  class AscendingObj implements Comparator<Picture> {
    @Override
    public int compare(Picture p1, Picture p2) {
      return p1.getTime().compareTo(p2.getTime());
    }

  }
  
  class SortAscendingObj implements Comparator<Picture> {
    @Override
    public int compare(Picture p1, Picture p2) {
//      return p1.getSortno().compareTo(p2.getSortno());
      return Integer.compare(p1.getSortno(), p2.getSortno());
    }

  }

  private static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {
    
    double theta = lon1 - lon2;
    double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
     
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515;
     
    if (unit == "targetilometer") {
        dist = dist * 1.609344;
    } else if(unit == "meter"){
        dist = dist * 1609.344;
    } 

    return (dist);
}
 

// This function converts decimal degrees to radians
private static double deg2rad(double deg) {
    return (deg * Math.PI / 180.0);
}
 
// This function converts radians to decimal degrees
private static double rad2deg(double rad) {
    return (rad * 180 / Math.PI);
}
}
