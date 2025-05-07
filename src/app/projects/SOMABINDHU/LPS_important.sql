  SELECT ROW_NUMBER()OVER(ORDER BY C.UNITID, C.VILLAGENAME_NEW,A.RSRSURVEYNUMBER,A.SD)[S.No],
         C.UNITID,
         C.VILLAGENAME_NEW AS UNITNAME,
         B.LA_STAGE_NAME,
         A.RSRSURVEYNUMBER,	
         A.SD,
         A.LA_NOTGIVENCONSENT
  FROM LPS_SURVEYNO_WISE_DETAILS A 
  INNER JOIN LA_STAGE B ON(A.LA_STAGE_ID=B.LA_STAGE_ID)
  INNER JOIN UNIT_MASTER C ON(A.UNITID=C.UNITID AND A.MANDALID=C.MANDALID AND A.VILLAGEID=C.VILLAGEID)
  INNER JOIN LPS_LANDOWNERRSRMASTERS D ON(A.UNITID=D.UNITID 
		    AND A.MANDALID=D.MANDALID AND A.VILLAGEID=D.VILLAGEID 
		    AND A.RSRSurveyNumber=D.RSRSURVEYNUMBER AND A.SD=D.SD)
  WHERE C.UnitID=@UNITID
    AND C.VILLAGENAME_NEW=@UNITNAME
    AND (B.LA_STAGE_NAME=@COLUMNNAME OR @COLUMNNAME IS NULL)

    ------- CA Details


    		 SELECT   UnitID,
				VillageName,
				MailId,
				CaName,
				AadhaarNumber,
				CAMobileNo
			
		   FROM LPS_CA_DETAILS



           

            -------- Formers and extent

             SELECT UNITID,UNITNAME 'Village',AadhaarNumber,FarmerName as 'Name of the Land Owner', SUM(ROWWISEEXTENT) AS 'Extent (In Acrs.)'  
 FROM APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL V   
 where UNITID is not null AND FLAG IN ('Y','N') 
 group by UNITID,UNITNAME,AadhaarNumber,FarmerName
 order by UNITID,UNITNAME,AadhaarNumber,FarmerName  


------
Units List 
select * from Unit_Master_Plot_Lottery
Units status
 SELECT *    FROM APCRDA..LPS_FORM_WISE_STATUS_DETAILS





 --- 2016 News
 select  RowID,NewsPaperName,NewsCategoryName, NotificationID,NewsPaperID, NewsCategoryID,Subject,ImageDocument,Path,FileName,   
g.GroupName, l.LocationName,    
CASE WHEN N.Edition ='1' THEN 'STATE'    
WHEN N.Edition='2' THEN 'DISTRICT' END AS 'EDITION',     
CONVERT(nvarchar(10), NewsDate, 103) as 'CreatedDate' ,    
CONVERT(nvarchar(10), CreatedDate, 103) as 'uploadeddate' ,  IsActive AS 'Is_Active' from       
APCRDA..CRDA_NEWS   N   with (nolock),     
APCRDA..CRDA_NEWS_GROUPMASTER G with (nolock) ,  APCRDA..CRDA_NEWS_LOCATIONMASTER L with (nolock)   
where      
N.NewsGroup = g.GroupID and n.Location = l.LocationID  
and n.IsActive='Y'




SELECT A.UnitID,a.UnitName,B.MandalName AS LandMandal,B.VillageName AS LandVillage,ReferenceID,AADHAARNO,                      
  (CASE WHEN A.LandType=1 THEN 'Dry' ELSE 'Jareebu' END)LandType,a.SurveyNo,a.RowWiseExtent,a.PATTANO,Hectors,a.SubDivision,East,West,North,South,a.CreatedBy,                      
  a.CreatedDate,ModifiedBy,ModifiedDate,                      
  a.LandCategory,                      
  c.RESIDENTIAL,                      
  c.COMMERCIAL--,LPSROWID            
  FROM REGISTRATIONAGREEMENTDETAILS_SURVEYNO_BOUNDARIES A                      
  INNER JOIN Unit_Master_Plot_Lottery B on(A.LandMandal=B.MandalId AND LandVillage=B.VillageID)                      
  INNER JOIN APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL c on(a.AADHAARNO=c.AadhaarNumber and a.LPSROWID=c.ROWID --and a.SurveyNo=c.SurveyNo                 
  --AND CONVERT(DECIMAL(18,4),A.RowWiseExtent)=CONVERT(DECIMAL(18,4),C.ROWWISEEXTENT )                     
  and a.LandMandal=c.LandMandal and a.LandVillage=c.LandVillage and a.LandType=c.LandType AND c.ROWWISEEXTENT<>0)    

  SELECT A.UnitID,a.UnitName,B.MandalName AS LandMandal,B.VILLAGENAME AS LandVillage,ReferenceID,AADHAARNO,                      
  (CASE WHEN A.LandType=1 THEN 'Dry' ELSE 'Jareebu' END)LandType,a.SurveyNo,a.RowWiseExtent,a.PATTANO,Hectors,a.SubDivision,East,West,North,South,a.CreatedBy,                      
  a.CreatedDate,ModifiedBy,ModifiedDate,                      
  a.LandCategory,                  
  c.RESIDENTIAL,                      
  c.COMMERCIAL          
  --DENSE_RANK() OVER (ORDER BY AADHAARNO) R_NO                      
  FROM REGISTRATIONAGREEMENTDETAILS_SURVEYNO_BOUNDARIES A                      
  INNER JOIN Unit_Master_Plot_Lottery B on(A.LandMandal=B.MandalId AND LandVillage=B.VillageID)            
  INNER JOIN APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL c on(a.AADHAARNO=c.AadhaarNumber and a.LPSROWID=c.ROWID --and a.SurveyNo=c.SurveyNo                 
  --AND CONVERT(DECIMAL(18,4),A.RowWiseExtent)=CONVERT(DECIMAL(18,4),C.ROWWISEEXTENT )                     
  and a.LandMandal=c.LandMandal and a.LandVillage=c.LandVillage and a.LandType=c.LandType AND c.ROWWISEEXTENT<>0)                      
  WHERE   a.LandType IN (1,2,3)  --and a.LPSROWID=57778   


  ======
  USE [APCRDA]
GO

/****** Object:  StoredProcedure [dbo].[GET_REGISTRATION_AGREEMENT_SY_WISE_DETAILS]    Script Date: 4/16/2025 3:58:47 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--exec [GET_REGISTRATION_AGREEMENT_SY_WISE_DETAILS] '592380217131','10','011','REG1200246646'  ,'2' ,'S','c'           
CREATE PROCEDURE [dbo].[GET_REGISTRATION_AGREEMENT_SY_WISE_DETAILS]                      
(                      
 @AADHAARNO VARCHAR(MAX),                      
 @MANDALID CHAR(2),                      
 @VILLAGEID CHAR(3),                      
 @REFERENCEID VARCHAR(100),                  
 @LandType varchar(20),      
 @OwnerType varchar(10)=NULL,      
 @FLAG VARCHAR(10)=NULL      
)                      
AS                      
BEGIN            
      
IF @FLAG='C'      
begin      
DECLARE @LV_CNT_REG INT,      
  @LV_CNT_COMM INT      
      
SELECT @LV_CNT_REG=COUNT(DISTINCT LAND_TYPE)       
  FROM RegistrationAgreementDetails_Residential       
 where AADHAARNO=@AADHAARNO      
   AND MANDALID=@MANDALID      
   AND VILLAGEID=@VILLAGEID      
      
SELECT @LV_CNT_COMM=COUNT(DISTINCT LAND_TYPE)      
  FROM RegistrationAgreementDetails_Commercial       
 where AADHAARNO=@AADHAARNO      
   AND MANDALID=@MANDALID      
   AND VILLAGEID=@VILLAGEID      
      
   IF @LV_CNT_REG>@LV_CNT_COMM      
   begin      
   SET @LANDTYPE='1,2'         
   end 
   else
   Begin

   SET @LANDTYPE='2'   

   End
end      
      
             
  IF(@LandType ='4')             
  BEGIN          
  SELECT *,DENSE_RANK() OVER (ORDER BY AADHAARNO) R_NO           
  FROM(          
  SELECT UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                      
  LandType,SurveyNo,SUM(CAST(RowWiseExtent AS DECIMAL(18,4)))RowWiseExtent,PATTANO,SUM(CAST(Hectors AS DECIMAL(18,4)))Hectors,SubDivision,East,West,North,South,                       
  LandCategory,                      
  SUM(RESIDENTIAL)RESIDENTIAL,                      
  SUM(COMMERCIAL)COMMERCIAL--,LPSROWID          
  FROM(          
  SELECT A.UnitID,a.UnitName,B.MandalName AS LandMandal,B.VillageName AS LandVillage,ReferenceID,AADHAARNO,                      
  (CASE WHEN A.LandType=1 THEN 'Dry' ELSE 'Jareebu' END)LandType,a.SurveyNo,a.RowWiseExtent,a.PATTANO,Hectors,a.SubDivision,East,West,North,South,a.CreatedBy,                      
  a.CreatedDate,ModifiedBy,ModifiedDate,                      
  a.LandCategory,                      
  c.RESIDENTIAL,                      
  c.COMMERCIAL--,LPSROWID            
  FROM REGISTRATIONAGREEMENTDETAILS_SURVEYNO_BOUNDARIES A                      
  INNER JOIN Unit_Master_Plot_Lottery B on(A.LandMandal=B.MandalId AND LandVillage=B.VillageID)                      
  INNER JOIN APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL c on(a.AADHAARNO=c.AadhaarNumber and a.LPSROWID=c.ROWID --and a.SurveyNo=c.SurveyNo                 
  --AND CONVERT(DECIMAL(18,4),A.RowWiseExtent)=CONVERT(DECIMAL(18,4),C.ROWWISEEXTENT )                     
  and a.LandMandal=c.LandMandal and a.LandVillage=c.LandVillage and a.LandType=c.LandType AND c.ROWWISEEXTENT<>0)                      
  --and a.LPSROWID=57778                  
        
  )AS A          
  GROUP BY UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                      
  LandType,SurveyNo,PATTANO,SubDivision,East,West,North,South,                      
  LandCategory            
  )AS B          
  END           
    ELSE             
  BEGIN          
  SELECT *     
  FROM(          
  SELECT UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                      
  LandType,SurveyNo,SUM(CAST(RowWiseExtent AS DECIMAL(18,4)))RowWiseExtent,PATTANO,SUM(CAST(Hectors AS DECIMAL(18,4)))Hectors,SubDivision,East,West,North,South,              
  LandCategory,                      
  SUM(RESIDENTIAL)RESIDENTIAL,                      
  SUM(COMMERCIAL)COMMERCIAL          
  FROM(          
  SELECT A.UnitID,a.UnitName,B.MandalName AS LandMandal,B.VILLAGENAME AS LandVillage,ReferenceID,AADHAARNO,                      
  (CASE WHEN A.LandType=1 THEN 'Dry' ELSE 'Jareebu' END)LandType,a.SurveyNo,a.RowWiseExtent,a.PATTANO,Hectors,a.SubDivision,East,West,North,South,a.CreatedBy,                      
  a.CreatedDate,ModifiedBy,ModifiedDate,                      
  a.LandCategory,                  
  c.RESIDENTIAL,                      
  c.COMMERCIAL          
  --DENSE_RANK() OVER (ORDER BY AADHAARNO) R_NO                      
  FROM REGISTRATIONAGREEMENTDETAILS_SURVEYNO_BOUNDARIES A                      
  INNER JOIN Unit_Master_Plot_Lottery B on(A.LandMandal=B.MandalId AND LandVillage=B.VillageID)            
  INNER JOIN APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL c on(a.AADHAARNO=c.AadhaarNumber and a.LPSROWID=c.ROWID --and a.SurveyNo=c.SurveyNo                 
  --AND CONVERT(DECIMAL(18,4),A.RowWiseExtent)=CONVERT(DECIMAL(18,4),C.ROWWISEEXTENT )                     
  and a.LandMandal=c.LandMandal and a.LandVillage=c.LandVillage and a.LandType=c.LandType AND c.ROWWISEEXTENT<>0)                      
  WHERE   a.LandType IN (1,2,3)  --and a.LPSROWID=57778                  
  
   )AS A          
  GROUP BY UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                      
  LandType,SurveyNo,PATTANO,SubDivision,East,West,North,South,                     
  LandCategory            
  )AS B          
            
  END             
END
GO








USE [APCRDA]
GO

/****** Object:  StoredProcedure [dbo].[GET_REGISTRATION_AGREEMENT_SY_WISE_DETAILS_NOWLUR]    Script Date: 4/16/2025 4:06:22 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


--exec [GET_REGISTRATION_AGREEMENT_SY_WISE_DETAILS_NOWLUR] '802703613208','12','003','NA','3',null ,'UNIT-03'         
CREATE PROCEDURE [dbo].[GET_REGISTRATION_AGREEMENT_SY_WISE_DETAILS_NOWLUR]                   
(                    
 @AADHAARNO VARCHAR(MAX),                    
 @MANDALID CHAR(2),                    
 @VILLAGEID CHAR(3),                    
 @REFERENCEID VARCHAR(100),                
 @LandType int,     
 @OwnerType varchar(10)=NULL,    
 @UNITID VARCHAR(100)                    
)                    
AS                    
BEGIN          
         
           
  IF(@LandType !=4)           
  BEGIN        
  SELECT  *,DENSE_RANK() OVER (ORDER BY AADHAARNO) R_NO         
  FROM(        
  SELECT distinct UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                    
  LandType,SurveyNo,SUM(CAST(RowWiseExtent AS DECIMAL(18,4)))RowWiseExtent,PATTANO,SUM(CAST(Hectors AS DECIMAL(18,4)))Hectors,SubDivision,East,West,North,South,CreatedBy,                    
  CreatedDate,ModifiedBy,ModifiedDate,                    
  LandCategory,                    
  SUM(RESIDENTIAL)RESIDENTIAL,                    
  SUM(COMMERCIAL)COMMERCIAL        
  FROM(        
  SELECT A.UnitID,a.UnitName,B.MandalName AS LandMandal,B.VillageName AS LandVillage,ReferenceID,AADHAARNO,                    
  (CASE WHEN A.LandType=1 THEN 'Dry' ELSE 'Jareebu' END)LandType,a.SurveyNo,a.RowWiseExtent,a.PATTANO,Hectors,a.SubDivision,East,West,North,South,a.CreatedBy,                    
  a.CreatedDate,ModifiedBy,ModifiedDate,                    
  a.LandCategory,                    
  c.RESIDENTIAL,                    
  c.COMMERCIAL          
  FROM REGISTRATIONAGREEMENTDETAILS_SURVEYNO_BOUNDARIES A                    
  INNER JOIN Unit_Master_Plot_Lottery B on(A.LandMandal=B.MandalId AND LandVillage=B.VillageID AND A.UnitID=B.UnitID)                    
  INNER JOIN APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL c on(a.AADHAARNO=c.AadhaarNumber and a.LPSROWID=c.ROWID               
                    
  and a.LandMandal=c.LandMandal and a.LandVillage=c.LandVillage and a.LandType=c.LandType AND c.ROWWISEEXTENT<>0 --and a.UnitID=c.UNITID  
  )                    
  WHERE a.LANDMANDAL=@MANDALID                     
  AND a.LANDVILLAGE=@VILLAGEID --AND OWNERTYPE=@OwnerType                      
  AND a.LandType=@LandType  --and a.UnitID=@UNITID               
  and AADHAARNO in (select LTRIM(RTRIM(value)) value from udf_split(@AADHAARNO,','))        
  )AS A        
  GROUP BY UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                    
  LandType,SurveyNo,PATTANO,SubDivision,East,West,North,South,CreatedBy,                    
  CreatedDate,ModifiedBy,ModifiedDate,                    
  LandCategory          
  )AS B        
  END         
    ELSE         
  BEGIN        
  SELECT *,DENSE_RANK() OVER (ORDER BY AADHAARNO) R_NO         
  FROM(        
  SELECT distinct UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                    
  LandType,SurveyNo,SUM(CAST(RowWiseExtent AS DECIMAL(18,4)))RowWiseExtent,PATTANO,SUM(CAST(Hectors AS DECIMAL(18,4)))Hectors,SubDivision,East,West,North,South,CreatedBy,                    
  CreatedDate,ModifiedBy,ModifiedDate,                    
  LandCategory,                    
  SUM(RESIDENTIAL)RESIDENTIAL,                    
  SUM(COMMERCIAL)COMMERCIAL        
  FROM(        
  SELECT A.UnitID,a.UnitName,B.MandalName AS LandMandal,B.VillageName AS LandVillage,ReferenceID,AADHAARNO,                    
  (CASE WHEN A.LandType=1 THEN 'Dry' ELSE 'Jareebu' END)LandType,a.SurveyNo,a.RowWiseExtent,a.PATTANO,Hectors,a.SubDivision,East,West,North,South,a.CreatedBy,                    
  a.CreatedDate,ModifiedBy,ModifiedDate,                    
  a.LandCategory,                    
  c.RESIDENTIAL,                    
  c.COMMERCIAL        
  --DENSE_RANK() OVER (ORDER BY AADHAARNO) R_NO                    
  FROM REGISTRATIONAGREEMENTDETAILS_SURVEYNO_BOUNDARIES A                    
  INNER JOIN Unit_Master_Plot_Lottery B on(A.LandMandal=B.MandalId AND LandVillage=B.VillageID AND A.UnitID=B.UnitID)              
  INNER JOIN APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL c on(a.AADHAARNO=c.AadhaarNumber and a.LPSROWID=c.ROWID --and a.SurveyNo=c.SurveyNo               
  --AND CONVERT(DECIMAL(18,4),A.RowWiseExtent)=CONVERT(DECIMAL(18,4),C.ROWWISEEXTENT )                   
  and a.LandMandal=c.LandMandal and a.LandVillage=c.LandVillage and a.LandType=c.LandType AND c.ROWWISEEXTENT<>0)                    
  WHERE a.LANDMANDAL=@MANDALID                     
  AND a.LANDVILLAGE=@VILLAGEID AND OWNERTYPE=@OwnerType AND A.UnitID= @UNITID                   
  AND a.LandType IN (1,2)  --and a.LPSROWID=57778                
  and AADHAARNO in (select LTRIM(RTRIM(value)) value from udf_split(@AADHAARNO,','))        
   )AS A        
  GROUP BY UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                    
  LandType,SurveyNo,PATTANO,SubDivision,East,West,North,South,CreatedBy,                    
  CreatedDate,ModifiedBy,ModifiedDate,                    
  LandCategory          
  )AS B        
          
  END          
END   
  
GO



FINAL918_CRDA_TDR_EXTENTS
exec GET_914EXTENTDATA @FROMDATE=N'04/01/2025',@TODATE=N'04/18/2025'
select ROW_NUMBER()over(order by A.[LPS Unit ID])[S.No],
A.[LPS Unit ID],A.[Name of the Village],A.MandalId,A.VillageID,
SUM(isnull(A.[Dry Extent],0))'Dry Extent',
SUM(isnull(A.[Jareebu Extent],0))'Jareebu Extent',
SUM(isnull(a.[Semi Urban Extent],0)) as 'Semi Urban Extent',CONVERT(DECIMAL(18,4),(ISNULL(SUM(convert(decimal(18,4),isnull(a.[914 EXTENT],0))),0))) AS 'Extent Covered by 9.14 Agreement as on 23/10/2015' FROM (
SELECT U.UnitID 'LPS Unit ID',U.VILLAGENAME_NEW AS 'Name of the Village',U.MandalId,U.VillageID ,

CASE WHEN L.LANDTYPEDESC='Dry' THEN CONVERT(DECIMAL(18,4),(ISNULL(SUM(convert(decimal(18,4),isnull(p.FExtent,0))),0))) END AS 'Dry Extent',
CASE WHEN L.LANDTYPEDESC='Jareebu' THEN CONVERT(DECIMAL(18,4),(ISNULL(SUM(convert(decimal(18,4),isnull(p.FExtent,0))),0))) END AS 'Jareebu Extent',
CASE WHEN L.LANDTYPEDESC='Semi Urban' THEN CONVERT(DECIMAL(18,4),(ISNULL(SUM(convert(decimal(18,4),isnull(p.FExtent,0))),0))) END AS 'Semi Urban Extent',
CONVERT(DECIMAL(18,4),(ISNULL(SUM(convert(decimal(18,4),isnull(p.FExtent,0))),0))) AS '914 EXTENT'
FROM UNIT_MASTER U
LEFT JOIN dbo.VW_LPS_SINGLE_MULTIPLE_ALL L WITH(NOLOCK) ON L.UNITID=U.UnitID AND L.UNITNAME=U.VILLAGENAME_NEW
left JOIN EPaymentDetails P with (nolock) ON P.FLROWID=L.ROWID
--and (DATEADD(DD,0,DATEDIFF(DD,0,p.PaymentDate)))<='10/23/2015'
AND (DATEADD(DD,0,DATEDIFF(DD,0,p.PaymentDate))) BETWEEN  DATEADD(DD,0,DATEDIFF(DD,0,@FROMDATE)) AND DATEADD(DD,0,DATEDIFF(DD,0,@TODATE))       
GROUP BY U.UnitID,U.VILLAGENAME_NEW,U.MandalId,U.VillageID,L.LANDTYPEDESC
)A  group by A.[LPS Unit ID],A.[Name of the Village],A.MandalId,A.VillageID



exec GetActiveNotifications @roleid=N'',@status=N'Y',@fromdate=N'',@todate=N'',@wheretoget=N'News and Events',@TendersDept=N''

Roles and users

select distinct m.ModuleID , m.ModuleName             
from APCRDA..role_user_options RO ,             
     APCRDA..Module_Master M            
where role_id=@RoleID and ro.ModuleID=m.ModuleID order by ModuleName

select distinct sm.SubModuleID,  sm.SubModuleName             
from APCRDA..role_user_options RO,            
     APCRDA..SubModule_Master SM            
where ro.role_id=@RoleID and  ro.ModuleID=@ModuleID and    ro.ModuleID = sm.ModuleID and         
ro.SubModuleID=sm.SubModuleID             
order by SubModuleID

exec GetRoleBasedLinks @RoleID=N'CA',@SubModuleID=N'4',@ModuleID=N'8'


select DISTINCT option_name from Role_user_options where is_active='y' AND role_id='CA' and option_name like '%9%'
exec GETTOP10SCREENS @UserID=N'NIDAMARRU-1-CA'




SELECT ROW_NUMBER() OVER (ORDER BY UNITID,UNITNAME,FARMERNAME) 'SNO', UNITID,UNITNAME,APPLICATIONNUMBER,    
   dbo.FN_GET_MASK_DATA(AADHAARNUMBER)AADHAARNUMBER,      
   CASE WHEN OWNERTYPE='S' THEN 'SINGLE' ELSE 'JOINT' END 'OWNERSHIP',FARMERNAME,FATHERNAME,RSRSURVEYNO,      
   RSRSUBDIVISIONNO,SURVEYNO,ROWWISEEXTENT 'FINALIZED EXTENT',ROWGARDENEXTENT 'GARDEN EXTENT',RESIDENTIAL,COMMERCIAL,      
   ISNULL(MUTATIONAPPNO,'NA') 'MUTATION APPNO.',ISNULL(MUTATIONJOINTAPPNO,'NA') 'MUTATION JOINT APPNO.'      
   FROM  APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL V      
   WHERE (LandMandal=@MANDALID OR '00'=@MANDALID) AND (UNITID=@UNITID OR '00'=@UNITID) AND (LandVillage=@VILLAGEID OR '00'=@VILLAGEID)       
   AND PAID_STATUS='N' AND caflag='N' AND ROWWISEEXTENT<>0



   9.18 B status REPORT
   exec DRYJAREEBU918BABSTRACTREPORT @LANDTYPE=N'00',@CATEGORY=N'00'


   exec GET_RESICOMMMASTERPLOTALLOTMENTTYPE 
   9.18 A status REPORT
   exec DRYJAREEBU918AABSTRACTREPORT @LANDTYPE=N'00',@CATEGORY=N'00'
   

   9.18 crda amd TDR extemnts abstract REPORT
   FINAL918_CRDA_TDR_EXTENTS



9.10 Publication
   exec FORM910_Public @MANDAL=N'0',@VILLAGE=N'00',@UNITID=N'00'

Form 9.1 Data updataion Dry and Jareebu Land Details REPORT
exec Get_Dry_Jarebu_LandDetails 


select ROW_NUMBER()OVER(ORDER BY lsd.Unit_ID,mcm.mandal_description,lsd.Land_Village_ID,mcv.village_name)[S.No],
lsd.Land_Mandal_ID,      
lsd.Land_Village_ID,      
dbo.initcap(mcm.mandal_description)mandal_description,      
dbo.initcap(mcv.village_name)village_name,      
ISNULL(lsd.Unit_ID,0) AS 'Unit_ID',      
SUM(case when lsd.Dry_Jareeb='2' then 1 else 0 end) as jarebu_farmers,   
SUM(case when lsd.Dry_Jareeb='2' then isnull(lsd.ExtentUnderLPS,0) else 0 end) as 'jarebu extents',   
isnull(SUM(case when lsd.Dry_Jareeb='1' then 1 else 0 end),0) as dry_farmers,      
SUM(case when lsd.Dry_Jareeb='1' then isnull(lsd.ExtentUnderLPS,0) else 0 end) as 'dry Extents'       
    
from LPS_Schedule2_Details_TEST lsd WITH(NOLOCK)      
 inner join MASTERCOMMONMANDAL mcm on lsd.Land_District_ID=mcm.Man_District_ID and lsd.Land_Mandal_ID=mcm.Mandal_ID      
 inner join MASTERCOMMONVILLAGE mcv on lsd.Land_District_ID=mcv.district_id and lsd.Land_Mandal_ID=mcv.mandal_id      
 and lsd.Land_Village_ID=mcv.village_id      
       
where lsd.Dry_Jareeb in (1,2) and Unit_ID is not null and ExtentUnderLPS is not null      
group by lsd.Land_Mandal_ID,lsd.Land_Village_ID,mcm.mandal_description,      
mcv.village_name,lsd.Unit_ID


9.1 Drill down on 

exec Get_Dry_Jarebu_Farmer_LandDetails @Land_Mandal_ID=N'12',@Land_Village_ID=N'003',@Unit_ID=N'2',@Land_Type=N'2'
exec Get_Dry_Jarebu_Farmer_LandDetails @Land_Mandal_ID=N'12',@Land_Village_ID=N'002',@Unit_ID=N'1',@Land_Type=N'1'

select Row_Number() over(order by Request_ID) Sno,              
lsd.Request_ID,
lsd.LandOwnerName LandOwnerName,
lsd.FatherName as FatherName,lsd.SurveyNo as 'Survey No',  
isnull(lsd.Phone_No,'NA') as 'Phone_No',
isnull(dbo.FN_GET_MASK_DATA(lsd.Aadhar_No),'NA') as 'Aadhar_No',              
lsd.Dry_Jareeb,isnull(lsd.ExtentUnderLPS,'0')ExtentUnderLPS,            
         
         
DBO.initcap( ISNULL(rtrim(ltrim(lsd.Resident_Addess)),'')+' '+rtrim(ltrim(ISNULL(mcv.village_name,'')))+rtrim(ltrim(ISNULL(mcm.mandal_description,'')))+              
rtrim(ltrim(ISNULL(mcd.district_description,' '))))
  address              
          
from LPS_Schedule2_Details_TEST lsd  WITH(NOLOCK)            
left outer join MASTERCOMMONVILLAGE mcv on lsd.Resident_District_ID=mcv.district_id and lsd.Resident_Mandal_ID=mcv.mandal_id              
and lsd.Resident_Village_ID=mcv.village_id              
left outer join MASTERCOMMONMANDAL mcm on lsd.Resident_District_ID=mcm.Man_District_ID and lsd.Resident_Mandal_ID=mcm.mandal_id              
left outer join MASTERCOMMONDISTRICT mcd on lsd.Resident_District_ID=mcd.district_id              
left outer join MasterCommanStates mcs on lsd.Resident_State_ID=mcs.ID                
    
where               
lsd.Land_Mandal_ID=@Land_Mandal_ID              
           
and lsd.Unit_ID=@Unit_ID              
           
and lsd.Dry_Jareeb=@Land_Type      
    
and lsd.Land_Village_ID=@Land_Village_ID              
and Unit_ID is not null and ExtentUnderLPS is not null




Form 9.11 Consolidated Reports (New)

exec GET_911COUNTSREPORT @Fdate=N'01/04/2015',@Todate=N'18/04/2025'



Form 9.12
exec UNITWISE_FARMERDETAILS_RPT_912_PRINTER @MandalID=N'12',@VillageID=N'006'

SELECT DISTINCT    F.ApplicationNumber,JC.LandOwnerName AS 'FarmerName',F.Father_HusbandName AS 'C/O Name',                        
dbo.FN_GET_MASK_DATA(JC.AadharNo) AS 'AADHAR NO',isnull(jc.MobileNo,'NA') MobileNo,  
case when F.FORM912PRINTFLAG='Y' then 'Not Generated' when F.FORM912PRINTFLAG='N' then 'Generated' End AS 'Print Status'                                                        
FROM PaymentCheckListForCollectorJC JC                                    
INNER JOIN LPSFARMERDETAILS F ON JC.AadharNo=F.AadhaarNumber                     
AND F.IsLandinMultipleVillages='N'                     
WHERE MandalID=@MandalID and VillageID=@VillageID order by F.ApplicationNumber


Drill down 9.12 generated form 

exec UPDATEPRINTDETAILSFOR912 @ReferenceID=N'OW01000697',@PrintFlag=N'N'



Form 10 case wise Orders Report
exec FORM910_Public_Report @MANDAL=N'12',@VILLAGE=N'006',@UNITID=N'UNIT-06',@ApplictionNo=N'LOUNIT0601052793'



Unit wise 9.14 Farmers List
exec GETPAIDDATA @MANDALID=N'12',@UNITID=N'UNIT-06',@VILLAGEID=N'006',@ANNUITY_PAID=N''

SELECT ROW_NUMBER() OVER (ORDER BY UNITID,UNITNAME,FARMERNAME) 'SNO', UNITID,UNITNAME,APPLICATIONNUMBER,    
   dbo.FN_GET_MASK_DATA(AADHAARNUMBER)AADHAARNUMBER,      
   CASE WHEN OWNERTYPE='S' THEN 'SINGLE' ELSE 'JOINT' END 'OWNERSHIP',FARMERNAME,FATHERNAME,RSRSURVEYNO,      
   RSRSUBDIVISIONNO,SURVEYNO,ROWWISEEXTENT 'FINALIZED EXTENT',ROWGARDENEXTENT 'GARDEN EXTENT',RESIDENTIAL,COMMERCIAL,      
   ISNULL(MUTATIONAPPNO,'NA') 'MUTATION APPNO.',ISNULL(MUTATIONJOINTAPPNO,'NA') 'MUTATION JOINT APPNO.'      
   FROM  APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL V      
   WHERE (LandMandal=@MANDALID OR '00'=@MANDALID) AND (UNITID=@UNITID OR '00'=@UNITID) AND (LandVillage=@VILLAGEID OR '00'=@VILLAGEID)       
   AND PAID_STATUS='N' AND caflag='N' AND ROWWISEEXTENT<>0

CRDA Housing details
exec GET_CRDA_HOUSING_DETAILS @MANDALID=N'12',@VILLAGEID=N'006',@UNITID=N'UNIT-06'
SELECT ROW_NUMBER()OVER(ORDER BY NAME)SNO,
IDD,
SURVEY_CODE,
DBO.INITCAP(NAME)NAME,
DBO.INITCAP(FATHER_NAME)FATHER_NAME,
GENDER,
AGE,
MARITALSTATUS,
CASTE,
DBO.FN_GET_MASK_DATA(AADHAR_NUMBER)AADHAR_NUMBER,
ISNULL(NULLIF(MOBILE_NO,''),'NA')MOBILE_NO,
DBO.INITCAP(PRESENTADDRESS)PRESENTADDRESS,
HOUSEOWNERSHIP,
ISNULL(NULLIF(BPL_CARD_NO,''),'NA')BPL_CARD_NO,
WARD_NAME,
MANDALID,
VILLAGEID,
UNITID,
REMARKS,
HOUSING_ID,
(CASE WHEN RECORD_STATUS='A' THEN 'Approved'
      WHEN RECORD_STATUS='R' THEN 'Rejected'
 END)RECORD_STATUS
FROM CRDA_HOUSING_DETAILS
WHERE MANDALID=@MANDALID
  AND VILLAGEID=@VILLAGEID
  AND UNITID=@UNITID
  AND RECORD_STATUS IS  NULL



exec GET_LPS_FORM_STATUS @USERID=N'NIDAMARRU-1',@NAME=N'FORM_93'


  9.10 Edition

  exec PopulateSurveyNos @DistrictID=N'07',@MandalID=N'12',@VillageID=N'006'
  
  exec PopulateLandMaNDALS 
  exec GetUnitMandals @MANDAL=N'12'


9.10 Edit screen

exec GETFARMERDETAILS_FOREDIT_UNIT_new @USERID=N'NIDAMARRU-1',@VillageID=N'006',@OwnerType=N'S',@UNITID=N'UNIT-06',@ORDERBY=N'RSRSurveyNo',@LANDTYPE=N'00',@LANDCATEGORY=N'00',@GARDENTYPE=N'00'
exec GETFARMERDETAILS_FOREDIT_UNIT_new @USERID=N'NIDAMARRU-1',@VillageID=N'006',@OwnerType=N'S',@UNITID=N'UNIT-06',@ORDERBY=N'FarmerName',@LANDTYPE=N'00',@LANDCATEGORY=N'00',@GARDENTYPE=N'00'


9.1 Edit
exec GetSurveyNo @Mandalid=N'12',@VillageId=N'006'

exec GetSheduleDetails @Mandalid=N'12',@VillageId=N'006',@SurveyNo=N'100'
exec Getlpsschedule2updatedetails_popup @Request_ID=N'LPS008598',@SubDivisionNo=N'100-A'     
exec Getlpsschedule2detailsforupdate @Request_ID=N'LPS008598',@sno=N'1',@userID=N'NIDAMARRU-1'
exec GetStates_id @stateid=N'01'

Survey No add
exec GetSelection 


9.18 A Not given List

exec NOTGIVELIST_918 @MANDALID=N'12',@UNITID=N'UNIT-06',@VILLAGEID=N'006'


9.18 data for Edit
exec GET918ADATAFOREDIT @USERID=N'NIDAMARRU-1',@MANDAL=N'12',@VILLAGE=N'006',@LANDTYPE=N'1',@OWNERTYPE=N'S'


9.1 Updation Reports
exec GET_LPS_SCHEDULE2_REPORT_DETAILS 
select ROW_NUMBER() over(order by a.Unit_ID) Sno, a.Mandal_ID,dbo.InitCap(a.mandal_description) as MANDALName,a.Unit_ID,        
sum(a.with_in_village) as with_in_village,sum(a.with_in_Mandal) as with_in_Mandal,        
sum(a.with_in_District) as with_in_District,sum(a.with_in_State) as with_in_State,sum(a.with_in_Country) as with_in_Country        
,sum(a.Out_Side_Country) as Out_Side_Country ,SUM(a.with_in_village+a.with_in_Mandal+a.with_in_District+        
a.with_in_State+a.with_in_Country        
+a.Out_Side_Country) as 'Total'  from         
        
(SELECT M.MandalID AS Mandal_ID,M.MANDALName AS mandal_description,        
ISNULL(CAST(lsd.Unit_ID AS VARCHAR),'NA') AS Unit_ID,                  
                   
ISNULL(SUM(case WHEN lsd.Resident_Type ='04' then 1 else '0' END),0) as with_in_village,                  
ISNULL(SUM(case WHEN lsd.Resident_Type ='03' then 1 else '0' END),0) as with_in_Mandal,                  
ISNULL(SUM(case WHEN lsd.Resident_Type ='02' then 1 else '0' END),0) as with_in_District,                  
ISNULL(SUM(case WHEN lsd.Resident_Type ='01' then 1 else '0' END),0) as with_in_State,                  
ISNULL(SUM(case WHEN lsd.Resident_Type ='05' then 1 else '0' END),0) as with_in_Country,                  
ISNULL(SUM(case WHEN lsd.Resident_Type ='06' then 1 else '0' END),0) as Out_Side_Country          
 FROM LPS_Schedule2_Details_TEST LSD   with (nolock)        
 INNER JOIN Unit_Master_unique M ON SUBSTRING(M.UnitID,6,2)=LSD.UNIT_ID                    
GROUP BY M.MandalID,M.MANDALName,LSD.UNIT_ID                  
 )a               
 group by         
  a.Mandal_ID,a.mandal_description,a.UNIT_ID          
  order by CONVERT(INT,a.Unit_ID)

  exec GET_LPS_SCHEDULE2_REPORT_DETAILS_ResidentType @Land_Mandal_ID=N'12',@Unit_ID=N'1',@Resident_Type=N'04'
  select  ROW_NUMBER() over(order by Unit_ID) Sno,                   
lsd.Request_ID,lsd.LandOwnerName,lsd.FatherName,lsd.SurveyNo as 'Survey No',
isnull(lsd.Phone_No,'NA') AS Phone_No,
ISNULL(dbo.FN_GET_MASK_DATA(lsd.Aadhar_No),'NA') AS Aadhar_No,                    
lsd.Patta_assigned,lsd.Dry_Jareeb,ExtentUnderLPS,  
ISNULL(lsd.Yards,'00') as 'ExtentUnderLPSSubCents',Unit_ID,          
 ms.Resident_Type_Desc as 'Resident_Type',                 
--lsd.Resident_Type,        
lsd.Resident_Addess,lsd.Resident_Village_ID,lsd.Resident_Mandal_ID,                    
lsd.Resident_District_ID,lsd.Resident_State_ID,                    
lsd.Resident_Country_ID                    
,                    
(rtrim(ltrim(ISNULL(lsd.Resident_Addess,'')))+rtrim(ltrim(ISNULL(mcv.village_name,'')))+rtrim(ltrim(ISNULL(mcm.mandal_description,'')))+                    
rtrim(ltrim(ISNULL(mcd.district_description,'')))                    
)  address                    
                    
 from LPS_Schedule2_Details_TEST lsd                    
                     
 left outer join MASTERCOMMONVILLAGE mcv on lsd.Resident_District_ID=mcv.district_id and lsd.Resident_Mandal_ID=mcv.mandal_id                    
  and lsd.Resident_Village_ID=mcv.village_id                    
                      
  left outer join MASTERCOMMONMANDAL mcm on lsd.Resident_District_ID=mcm.Man_District_ID and lsd.Resident_Mandal_ID=mcm.mandal_id                    
                      
  left outer join MASTERCOMMONDISTRICT mcd on lsd.Resident_District_ID=mcd.district_id                    
                      
  left outer join MasterCommanStates mcs on lsd.Resident_State_ID=mcs.ID                    
  inner join MSTR_LPS_RESIDENT_TYPE ms on lsd.Resident_Type=ms.Resident_Type_ID                  
                      
----  inner join MasterCountries mcc on lsd.Resident_Country_ID=mcc.CountryID                    
                     
 where                     
                    
 lsd.Land_Mandal_ID=@Land_Mandal_ID                    
                     
 and lsd.Unit_ID=@Unit_ID                    
                     
 and lsd.Resident_Type=@Resident_Type


 9.2 Objections

 exec GET_OBJECTIONPROCEEDINGS @UNITID=N'UNIT-06',@MANDALID=N'12',@VILLAGEID=N'006'


 9.23 by Aadhar No
 exec GET_FORM_923_DETAILS @LANDMANDAL=N'12',@LANDVILLAGE=N'006',@UNITID=N'UNIT-06',@AadhaarNumber=N'200669377406'


 LPS court cases
 exec GET_LPSPENDINGCASES_COURTCASES @MANDAL=N'12',@VILLAGE=N'006',@UNIT=N'UNIT-06',@CATEGORY=0,@FLAG=N'P'


 9.14 Assigned Land
 exec get914AssignedRequests_Joint @userID=N'NIDAMARRU-1',@MANID=N'12',@UNID=N'UNIT-06',@VILLID=N'006'
 exec UPDATEPRINTDETAILS_JOINT @ApplicationNo=N'LPUNIT0604059684',@PrintFlag=N'N'


 9.3 Late consents
 exec LPS_get_rsr_surveynumbers_subdivision @RSRsurveynumber=N'00',@mandal=N'00',@villageid=N'00'
 EXEC GET_SEQUENCE_NUMBER 'Father_Details'
 exec PopulateDistricts_State @regCode=N'01'
 exec PopulateLandVillages_NEW @DistrictID=N'07',@MandalID=N'12'
 exec LPS_get_rsr_surveynumbers @DISID=N'07',@MANDID=N'12',@VILLID=N'006'
 exec LPS_get_rsr_surveynumbers_subdivision @RSRsurveynumber=N'4',@mandal=N'12',@villageid=N'006'

 exec GET_LPS_FORM_STATUS @USERID=N'NIDAMARRU-1',@NAME=N'FORM_93_ENTRY'
 exec PopulateDistricts_State @regCode=N'01'
exec PopulateBanks @DistrictId=N'04'


9.18 Village wise Information Reports
exec GET918APROFORMA_COMM1 @MANDALID=N'12',@VILLAGEID=N'006'
SELECT ROW_NUMBER() OVER (ORDER BY LandMandal,LandVillage) 'ROWID',MandalName,VillageName,PLOTALLOTMENTROWID,
dbo.FN_GET_MASK_DATA(AadhaarNumber)AadhaarNumber,
FarmerName,FatherName,ApplicationNumber,SurveyNo,ROWWISEEXTENT,RESIDENTIAL,COMMERCIAL,LandMandal,LandVillage,r_BLOCKTYPE,r_PLOTCODE,r_EXTENT_SYARDS,r_NOOFBLOCKS,
r_SUMEXTENT_SYARDS,r_TDR,r_RESIDENTIALSUM,r_RESIDENTIALGIVEN,r_RESIDENTIALREMAINING,r_JOINT918,r_CRDA,r_TDRBOND,c_BLOCKTYPE,c_PLOTCODE,c_EXTENT_SYARDS,c_NOOFBLOCKS,
c_SUMEXTENT_SYARDS,c_TDR,c_COMMERCIALSUM,c_RESIDENTIALGIVEN,c_RESIDENTIALREMAINING,c_JOINT918,c_CRDA,c_TDRBOND,LandType,flag
FROM #RESULT  
WHERE LandMandal=@MANDALID AND LandVillage=@VILLAGEID  ORDER BY MandalName,VillageName,FarmerName



9.18 New
exec GETPLOTALLOTMENTDETAILS_NEW @MANDAL=N'12',@UNITID=N'NIDAMARRU-1',@VILLAGE=N'006',@OWNERTYPE=N'S',@REFERENCENO=N'200669377406'


9.18 Editable data
exec GET918ADATAFOREDIT @USERID=N'NIDAMARRU-1',@MANDAL=N'12',@VILLAGE=N'006',@LANDTYPE=N'00',@OWNERTYPE=N'M'
SELECT          
 A.ROWID,A.PLOTROWID,A.MANDALID,A.UNITID,A.UNITNAME,A.VILLAGEID,A.OWNERTYPE,dbo.FN_GET_MASK_DATA(A.AADHAARNO) AADHAARNO,A.AADHAARNO AADHAARNO1,A.FARMERNAME,A.FATHERNAME,A.LANDTYPE,B.LandTypeDesc,          
 A.EXTENTSUM,A.RESIDENTIALSUM,A.COMMERCIALSUM,A.RESIDENTIALGIVEN,A.COMMERCIALGIVEN,A.RESIDENTIALREMAINING,A.COMMERCIALREMAINING           
 INTO #A  
 FROM APCRDA..PLOTALLOTMENTDETAILS A WITH(NOLOCK)           
 INNER JOIN MASTERLANDTYPE B  WITH(NOLOCK) ON A.LANDTYPE=B.LandTypeID          
 WHERE MANDALID=@MANDAL AND VILLAGEID=@VILLAGE AND CREATEDBY=@USERID   
 AND LANDTYPE in (1,3) AND OWNERTYPE=@OWNERTYPE AND RECFLAG='Y'


 SELECT          
 A.ROWID,A.PLOTROWID,A.MANDALID,A.UNITID,A.UNITNAME,A.VILLAGEID,A.OWNERTYPE,dbo.FN_GET_MASK_DATA(A.AADHAARNO) AADHAARNO,A.AADHAARNO AADHAARNO1,A.FARMERNAME,A.FATHERNAME,A.LANDTYPE,B.LandTypeDesc,          
 A.EXTENTSUM,A.RESIDENTIALSUM,A.COMMERCIALSUM,A.RESIDENTIALGIVEN,A.COMMERCIALGIVEN,A.RESIDENTIALREMAINING,A.COMMERCIALREMAINING    
 INTO #B         
 FROM APCRDA..PLOTALLOTMENTDETAILS A WITH(NOLOCK)           
 INNER JOIN MASTERLANDTYPE B  WITH(NOLOCK) ON A.LANDTYPE=B.LandTypeID          
 WHERE MANDALID=@MANDAL AND VILLAGEID=@VILLAGE AND CREATEDBY=@USERID   
 AND LANDTYPE IN (1,3) 
 --AND LANDTYPE=3
 AND OWNERTYPE=@OWNERTYPE AND RECFLAG='Y'

 exec GET918ADATAFORUPDATE @PLOTROWID=N'SPUNIT0605007371',@LANDTYPE=N'1',@OWNERTYPE=N'M',@MANDALID=N'12',@VILLAGEID=N'006',@USERID=N'NIDAMARRU-1'
 SELECT P.ROWID,     
 P.PLOTROWID,P.MANDALID,P.UNITID,P.UNITNAME,P.VILLAGEID,P.OWNERTYPE,P.AADHAARNO,P.FARMERNAME,P.FATHERNAME,P.LANDTYPE,P.EXTENTSUM,    
    P.RESIDENTIALSUM,P.COMMERCIALSUM,P.RESIDENTIALGIVEN,P.COMMERCIALGIVEN,P.RESIDENTIALREMAINING,P.COMMERCIALREMAINING,P.TDR,P.RECI_COMM_TYPE     
FROM PLOTALLOTMENTDETAILS P    
WHERE P.PLOTROWID=@PLOTROWID AND (CONVERT(VARCHAR,P.LANDTYPE) IN (select * from dbo.fnSplitString(@TYPE,',')))     
 AND P.OWNERTYPE=@OWNERTYPE AND P.MANDALID=@MANDALID AND P.VILLAGEID=@VILLAGEID AND P.CREATEDBY=@USERID

 SELECT B.ROWID,    
 B.MANDALID,B.UNITID,B.UNITNAME,B.VILLAGEID,B.OWNERTYPE ,B.AADHAARNO,B.LANDTYPE ,B.BLOCKTYPE,B.EXTENT_SYARDS,    
    B.NOOFBLOCKS,B.SUMEXTENT_SYARDS,B.PLOTALLOTMENTROWID,B.TDR,B.TDRFLAG     
FROM PLOTALLOTMENTBLOCKS B    
WHERE B.TDRFLAG='R'    
 AND B.PLOTALLOTMENTROWID=@PLOTROWID AND (CONVERT(VARCHAR,B.LANDTYPE) IN (select * from dbo.fnSplitString(@TYPE,',')))    
 AND B.OWNERTYPE=@OWNERTYPE AND B.MANDALID=@MANDALID AND B.VILLAGEID=@VILLAGEID AND B.CREATEDBY=@USERID

 SELECT  B.ROWID,    
 B.MANDALID,B.UNITID,B.UNITNAME,B.VILLAGEID,B.OWNERTYPE ,B.AADHAARNO,B.LANDTYPE ,B.BLOCKTYPE,B.EXTENT_SYARDS,    
    B.NOOFBLOCKS,B.SUMEXTENT_SYARDS,B.PLOTALLOTMENTROWID,B.TDR,B.TDRFLAG     
FROM PLOTALLOTMENTBLOCKS B    
WHERE B.TDRFLAG='C'    
 AND B.PLOTALLOTMENTROWID=@PLOTROWID AND (CONVERT(VARCHAR,B.LANDTYPE) IN (select * from dbo.fnSplitString(@TYPE,',')))     
 AND B.OWNERTYPE=@OWNERTYPE AND B.MANDALID=@MANDALID AND B.VILLAGEID=@VILLAGEID AND B.CREATEDBY=@USERID

 SELECT O.ROWID,    
 O.UNITID,O.UNITNAME,O.MANDAL,O.VILLAGE,O.APPLICATIONNUMBER,O.OWNERTYPE,O.FARMERNAME,O.FATHERNAME,O.AADHAARNO,    
    O.LANDTYPE,O.SURVEYNO,O.ROWWISEEXTENT,O.RESIDENTIAL ,O.COMMERCIAL,O.LANDROWID,O.PLOTROWID    
FROM PLOTALLOTMENTDETAILS_ORIGINAL O    
WHERE O.PLOTROWID=@PLOTROWID AND (CONVERT(VARCHAR,O.LANDTYPE) IN (select * from dbo.fnSplitString(@TYPE,',')))     
 AND O.OWNERTYPE=@OWNERTYPE AND O.MANDAL=@MANDALID AND O.VILLAGE=@VILLAGEID AND O.CREATEDBY=@USERID

 exec GET_RESIMASTERPLOTALLOTMENTTYPE 
 exec GET_COMMMASTERPLOTALLOTMENTTYPE 
 exec PopulateUnitVillages @DistrictID=N'07',@MandalID=N'12',@UnitId=N'UNIT-06'


 9.18 status Report
 exec DRYJAREEBU918AABSTRACTREPORT @LANDTYPE=N'00',@CATEGORY=N'992'


Legal heir documentation
exec PR_GET_REG_LPOC_MUTATION_DETAILS @MANDALID=N'12',@UNITID=N'UNIT-06',@VILLAGEID=N'006',@LANDTYPE=1,@FLAG=N'R'

SELECT DISTINCT AllocatedPlotcode,PLOTALLOTMENTROWID,Plot_Slno
INTO #TEMP_B
FROM(
SELECT AllocatedPlotcode,PLOTALLOTMENTROWID,Plot_Slno
  FROM RegistrationAgreementDetails_Residential
  WHERE @FLAG='R'
  and Land_Type IN(SELECT ITEMS FROM DBO.SPLIT(@LANDTYPE,','))
UNION ALL
SELECT AllocatedPlotcode,PLOTALLOTMENTROWID,Plot_Slno
  FROM RegistrationAgreementDetails_Commercial
  WHERE @FLAG='C'
  --and Land_Type=@LANDTYPE
  and Land_Type IN(SELECT ITEMS FROM DBO.SPLIT(@LANDTYPE,','))
)AS A

SELECT ROW_NUMBER()OVER(ORDER BY PLOT_MUTATION_NO,A.AADHAARNUMBER,PLOT_TYPE_NAME,PLOT_CODE)SNO,A.*,
B.PLOTALLOTMENTROWID,
--ReferenceID,
ISNULL(CAST(C.ReferenceID AS varchar),'NA')ReferenceID,
ISNULL(b.Plot_Slno,'NA') as Plot_Slno,
(case when Plot_Slno like '1/%'  then 'Y' else 'N' end) TDR
FROM(
 select distinct a.PLOT_MUTATION_NO,
	    a.UNITNAME,
		STUFF((SELECT  ',' + ISNULL(aad.FARMERNAME,'NA')
		        from(select distinct aa.FARMERNAME,aa.AADHAARNUMBER
				from LPS_DETAILS_PLOT_MUTATION aa
                inner join LPS_REG_PLOT_MUTATION bb on(aa.PLOT_MUTATION_NO=bb.PLOT_MUTATION_NO AND aA.IS_ACTIVE=bB.IS_ACTIVE) --and aa.LANDTYPEID=bb.LANDTYPEID)
				where aa.PLOT_MUTATION_NO=a.PLOT_MUTATION_NO
				  and bb.PLOT_CODE=b.PLOT_CODE
				  and bb.PLOT_TYPE_NAME=@lv_PLOT_TYPE_NAME
				  AND AA.LANDMANDAL=@MANDALID
				  AND AA.LANDVILLAGE=@VILLAGEID
				  --AND BB.LANDTYPEID=@LANDTYPE
				  and BB.LANDTYPEID IN(SELECT ITEMS FROM DBO.SPLIT(@LANDTYPE,','))
				  AND (AA.UNITID=@UNITID OR @UNITID='00')
				  )as aad
                     ORDER BY aad.AADHAARNUMBER
             FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,'')FARMERNAME,--
		STUFF((SELECT  ',' + ISNULL(asd.AADHAARNUMBER,'NA') AADHAARNUMBER
		      from(select distinct aa.AADHAARNUMBER
					 from LPS_DETAILS_PLOT_MUTATION aa
                inner join LPS_REG_PLOT_MUTATION bb on(aa.PLOT_MUTATION_NO=bb.PLOT_MUTATION_NO AND aA.IS_ACTIVE=bB.IS_ACTIVE)-- and aa.LANDTYPEID=bb.LANDTYPEID)
				where aa.PLOT_MUTATION_NO=a.PLOT_MUTATION_NO
				  and bb.PLOT_CODE=b.PLOT_CODE
				  and bb.PLOT_TYPE_NAME=@lv_PLOT_TYPE_NAME
				  AND AA.LANDMANDAL=@MANDALID
				  AND AA.LANDVILLAGE=@VILLAGEID
				  --AND BB.LANDTYPEID=@LANDTYPE
				  and BB.LANDTYPEID IN(SELECT ITEMS FROM DBO.SPLIT(@LANDTYPE,','))
				  AND (AA.UNITID=@UNITID OR @UNITID='00')
				  )as asd
                     ORDER BY asd.AADHAARNUMBER
             FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,'') AADHAARNUMBER,---
		a.LANDMANDAL,
		a.LANDVILLAGE,
		b.PLOT_CODE,
		b.PLOT_TYPE_NAME,
		(CASE WHEN b.LANDTYPEID='1' THEN 'Dry'
		 ELSE 'Jareebu'
		 END)LANDTYPE,
		STUFF((SELECT  ',' + ISNULL(V1.AADHAARNUMBER,'NA')
					 FROM LPSFARMERDETAILS_PLOT_MUTATION V1 WITH(NOLOCK)
                    WHERE V1.PLOT_MUTATION_NO=a.PLOT_MUTATION_NO
					  AND V1.IS_ACTIVE='Y'
                     ORDER BY V1.AADHAARNUMBER
             FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,'') AADHAARNUMBERS,
		STUFF((SELECT  ',' + ISNULL(V1.FarmerName,'NA')
					 FROM LPSFARMERDETAILS_PLOT_MUTATION V1 WITH(NOLOCK)
                    WHERE V1.PLOT_MUTATION_NO=a.PLOT_MUTATION_NO
					  AND V1.IS_ACTIVE='Y'                    
                     ORDER BY V1.AADHAARNUMBER
             FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,'') FARMERNAMES
from LPS_DETAILS_PLOT_MUTATION a
inner join LPS_REG_PLOT_MUTATION b on(a.PLOT_MUTATION_NO=b.PLOT_MUTATION_NO AND A.IS_ACTIVE=B.IS_ACTIVE )--and a.LANDTYPEID=b.LANDTYPEID)
where A.IS_ACTIVE='Y'
  AND A.LANDMANDAL=@MANDALID
  AND A.LANDVILLAGE=@VILLAGEID
  --and B.LANDTYPEID=@LANDTYPE
  and B.LANDTYPEID IN(SELECT ITEMS FROM DBO.SPLIT(@LANDTYPE,','))
  and b.PLOT_TYPE_NAME=@lv_PLOT_TYPE_NAME
  AND (A.UNITID=@UNITID OR @UNITID='00')
  )AS A
LEFT JOIN #TEMP_B B ON(A.PLOT_CODE=B.AllocatedPlotcode)
LEFT JOIN #TEMP_C C ON(A.AADHAARNUMBER=C.AADHAARNO)

exec PR_GET_REG_LPOC_MUTATION_INDIVIDUAL_DETAILS @MANDALID=N'12',@UNITID=N'UNIT-06',@VILLAGEID=N'006',@LANDTYPE=1,@FLAG=N'R',@PLOT_CODE=N'26-789-3854-21-C18',@AAdhaar=N'931940601412'



9.24 LPOC 

exec GET_POPULATE_PLOTCODES @MANDALID=N'12',@VILLAGEID=N'006',@FLAG=N'R',@Prifix=N'5555'
exec GETLPOCDETAILS_FINAL_NELAPADU_RES_TDR_JOINT @PLOTCODE=N'66666',@MANDALID=N'12',@VILLAGEID=N'006',@LandType=1


Villa Plots
exec GET918ADATAFORVILLA @PLOTROWID=N'5555',@MANDALID=N'12',@VILLAGEID=N'006',@USERID=N'NIDAMARRU-1'


Mutation status Report
exec FORM93DATA_MUTATION_RPT @LANDMANDAL=N'12',@LANDVILLAGE=N'006',@UNIT=N'UNIT-06',@STATUS=N'00'

select  Row_Number() over (order by ApplicationNumber) Sno,* 
from (
SELECT l.ApplicationNumber,FarmerName,l.FatherName as 'FatherName',ISNULL(MobileNumber,'NA')AS MobileNumber,                    
dbo.FN_GET_MASK_DATA(ISNULL(AadhaarNumber,'NA')) AadhaarNumber,                    
m.mandal_description as 'Mandal', v.village_name as 'Village',                                                                  
l.RSRSurveyNo,l.RSRSubdivisionNo,l.SurveyNo,l.Subdivision,                                                                
(CAST(isnull(l.TotalExtent,0) AS FLOAT)+CAST(isnull(l.TotalExtentCents,0) AS FLOAT)/100)                                                                  
 AS 'TotalExtent in Acrs',L.LandType as 'Dry/Jareebu', L.LandType,                                                                 
                                                                   
c.LandCategoryDesc as 'LandCategory',                                               
case when g.GardenName='Others' then 'Not Garden' else g.GardenName END   as 'Garden',                                               
isnull(case when l.gardenextent like '%[0-9]%' THEN CAST(l.gardenextent AS float) ELSE 0 end ,0) as 'Garden extent' ,                                                                
(CAST(isnull(l.ExtentUnderLPS,0) AS FLOAT)+(CAST(isnull(l.ExtentUnderLPSCents,0) AS FLOAT)/100)+(CAST(ISNULL(l.ExtentUnderLPSSubCents,0)AS FLOAT)/10000))                                                                  
 AS 'Claimed extent',                                   
L.FINALISEDDATE  as 'Finalised Date',                                                                 
case when l.FLAG='N' and l.caflag='Y' and l.COLFLAG='Y' then 'Recommended'                                     
    when l.flag='N' and l.caflag='N' and l.COLFLAG='Y'  then 'Finalised'                                            
      when l.flag='N' and l.caflag='N' and l.COLFLAG='N' and l.Paidflag='Y' then 'Approved'                                    
      WHEN L.FLAG='Y' THEN 'To be Recommended'  
      WHEN l.FLAG='N' and l.caflag='N' and l.COLFLAG='N' AND Paidflag='N' then 'Paid'                                     
      else 'Not Available'                                             
      end as 'Application Status',                                                                  
(CAST(isnull(l.FExtentLPSAcres,0) AS FLOAT)+(CAST(isnull(l.FExtentLPSCents,0) AS FLOAT)/100)+(CAST(ISNULL(l.FExtentLPSSubCents,0)AS FLOAT)/10000)) AS 'StatusExtent',                  
--'SingleOwner' as 'OwnershipType'                  
case when MutationOwnerFlag='S' then 'SingleOwner'  when MutationOwnerFlag='M' THEN 'JointOwners' END as 'OwnershipType' ,  
MutationAppNo 'Partners',  
 case when (select  COUNT(1)   from LPSFarmerlanddetails_all l1 with(nolock) where l1.AadhaarNumber=l.AadhaarNumber and L1.ISLANDINMULTIPLEVILLAGES='Y')=2 then                     
'Having land in village '+rtrim(ltrim(v.village_name))+' with extent '+                    
(select CAST(sum(ROWWISEEXTENT) as varchar) from LPSFarmerlanddetails_all l1 with(nolock) where l1.AadhaarNumber=l.AadhaarNumber             
--and l1.UNITID<>@UNIT            
)                    
ELSE 'NA' END AS 'Remarks',              
CASE WHEN L.Purchased28thfeb=1 THEN 'Intime'WHEN L.Purchased28thfeb=0 THEN 'Late' END as 'Consent'                   
                                                        
  FROM LPSFarmerlanddetails_ALL l WITH(NOLOCK)                   
                                  
inner join mandal m on m.Mandal_ID=l.LandMandal and m.Man_District_ID=l.LandDistrict                          
inner join village v on v.village_id=l.LandVillage and v.mandal_id=m.Mandal_ID and m.Man_District_ID=v.district_id                                                              
inner join MASTERLANDCATEGORY c on l.LandCategory=c.LandCategoryID                                                               
inner join MASTERLANDTYPE t on t.LandTypeID=l.LandType                                                                  
inner join MASTERGARDEN g on g.GardenID=l.GardenType  --AND CA.CollectoStatus='Y'                       
and (l.LandMandal=@LANDMANDAL or '00'=@LANDMANDAL)                                                       
and (l.LandVillage=@LANDVILLAGE or '00'=@LANDVILLAGE)       
AND (l.UNITID=@UNIT OR '00'=@UNIT)                   
--AND l.UNITID=@UNIT  --AND  l.OWNERTYPE='S'             
AND L.MU_FLAG='Y' ) T            
WHERE        
 ([Application Status] = CASE WHEN @STATUS='2' THEN 'Approved'            
         WHEN @STATUS='3' THEN 'Finalised'            
         WHEN @STATUS='4' THEN 'Recommended'            
         WHEN  @STATUS='5' THEN 'To be Recommended'            
         WHEN @STATUS='1' THEN '1'  END   OR '00'=@STATUS )



         Consenting Land owners List -1
         exec Get_LandfarmerreportDetails @userid=N'NIDAMARRU-1'



         9.3 Document Report
         exec GET_DOCSTATUSREPORT @MANDALID=N'12',@UNITID=N'UNIT-06',@VILLAHENAME=N'006'
         SELECT  A.ApplicationNumber,
[dbo].[FN_GET_MASK_DATA](A.AadhaarNumber) AadhaarNumber,
DBO.INITCAP(A.FarmerName)FarmerName,
DBO.INITCAP(A.FatherName) AS 'Father_HusbandName',
ISNULL(NULLIF(A.MobileNumber,''),'NA') MobileNumber,
A.UNITID,A.UNITNAME AS   'VILLAGENAME',        
CASE WHEN SUM(CASE WHEN B.DocumentID='3' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END  AS 'Copy of Pattadar Passbook',        
CASE WHEN SUM(CASE WHEN B.DocumentID='4' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'Link Documents',        
CASE WHEN SUM(CASE WHEN B.DocumentID='5' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'Encumbrance Certificate for 15 Years',        
CASE WHEN SUM(CASE WHEN B.DocumentID='6' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'Title Deed',        
CASE WHEN SUM(CASE WHEN B.DocumentID='7' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'D-Form Patta',        
CASE WHEN SUM(CASE WHEN B.DocumentID='2' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'Application Form With Affidavit to Take Part in LPS',        
CASE WHEN SUM(CASE WHEN B.DocumentID='9' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'Any Other Documents',        
CASE WHEN SUM(CASE WHEN B.DocumentID='1' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'Photo',        
CASE WHEN SUM(CASE WHEN B.DocumentID='8' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'Copy of Bank A/c Pass Book',    
CASE WHEN SUM(CASE WHEN B.DocumentID='10' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'Enjoyment Sketch',       
CASE WHEN SUM(CASE WHEN B.DocumentID='11' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'Adangal',    
CASE WHEN SUM(CASE WHEN B.DocumentID='12' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS '910 Orders'   
--CASE WHEN SUM(CASE WHEN B.DocumentID='13' THEN 1 ELSE '0' END)>0 THEN 'YES' ELSE 'NO' END AS 'Encumbrance Certificate for 15 Years'    
    
    
 FROM (SELECT DISTINCT  ApplicationNumber,AadhaarNumber,FarmerName,FatherName,MobileNumber,UNITID,UNITNAME ,        
 LandMandal,LandVillage FROM LPSFarmerlanddetails_ALL )  A        
LEFT JOIN LandOwner_Documents  B ON A.ApplicationNumber=B.ReferenceID        
        
WHERE (A.UNITID=@UNITID OR '00'=@UNITID) AND ( A.LandMandal=@MANDALID OR '00'=@MANDALID) AND (A.landvillage=@VILLAHENAME       
OR '00'=@VILLAHENAME)        
        
GROUP BY A.ApplicationNumber,A.AadhaarNumber,A.FarmerName,A.FatherName,A.MobileNumber,A.UNITID,A.UNITNAME



Household Survey details

exec GET_HHS_DETAILS_HHDB @Mandalid=N'12',@villageid=N'006'

select ROW_NUMBER()OVER(ORDER BY VILLAGENAME,INFORMANT_NAME)SNO,*
FROM(
SELECT 
A.*,ISNULL(D.PENSION_AMOUNT,0) AS PENSION,
ISNULL(D.VULNERABLE_STATUS,'No')AS [Is Vulnerable Family],
ISNULL((SELECT DISTINCT 'Y'
  FROM #TEMP_A AAA
  WHERE AAA.NEWAUTO_ID_AR=D.NEWAUTO_ID_AR
    AND AAA.NewAutoID=D.NewAutoID
),'N')FAMILY_SURVEY_COMPLETED_STATUS
FROM(SELECT 
	   HH.MANDALID, 
       HH.VILLAGEID, 
	   HH.PANCHAYATID, 
	   HH.HABITATIONID, 
	   B.DISTRICTNAME,
	   B.MANDALNAME,
       B.PANCHAYATNAME,
       B.VILLAGENAME,
	   HH.HOUSE_NO, 
	   HH.NewAutoID'AUTO_ID',
	   HH.NEWAUTO_ID_AR AS AMARAVATHIID,
DBO.INITCAP(INFORMANT_NAME) as 'INFORMANT_NAME',
COUNT(F.NEWAUTO_ID_AR) AS 'FAMILYCOUNT'

--ISNULL((SELECT SUM(CAST(AMOUNT AS DECIMAL(18,2)))
--   FROM PENSIONDETAILS_MONTHWISE CC WITH(NOLOCK)
-- WHERE CC.REFERENCEID=HH.NewAutoID
--    AND CC.DataShared='Y'
--),0) AS PENSION,
--(SELECT  TOP 1 'Vulnerable'
--FROM DBO.CRDA_VULNERABILITY_FAMILIES C WITH(NOLOCK)
--WHERE EXISTS(SELECT 1
--			 FROM DBO.HABITATIONFAMILYMEMBERSDETAILS_ANDROIDAPPTABLE B WITH(NOLOCK)
--			 WHERE (B.NewAutoID=C.NEWAUTOID OR B.Ration_card=C.RATION_ID OR B.AADHAAR_NUMBER=C.AADHAAR_NUMBER)
--			   AND B.NewAutoID=HH.NewAutoID
--			   AND B.NEWAUTO_ID_AR=HH.NEWAUTO_ID_AR
--			 )
--)AS   ISVULNERABLEFAMILY
from APCRDA.DBO.HabitationHouseHOLDData_AndroidAppTable HH with (nolock)   
INNER JOIN MASTERS_ALL_HHS B ON(B.DISTRICTID='07' AND HH.MANDALID=B.MANDALID AND HH.VILLAGEID=B.VILLAGEID AND HH.PANCHAYATID=B.PANCHAYATID)
INNER JOIN APCRDA.DBO.HabitationFamilyMembersDetails_AndroidAppTable F WITH(NOLOCK) ON (F.MANDALID=HH.MANDALID AND F.VILLAGEID=HH.VILLAGEID AND HH.NewAutoID=F.NewAutoID 
		AND HH.NEWAUTO_ID_AR=F.NEWAUTO_ID_AR)
where  hh.MANDALID=@Mandalid
  AND hh.VILLAGEID IN (SELECT ITEMS FROM DBO.Split(@LV_VILLAGEID,','))
  AND (HH.ASSIGNED_USER_ID=@USER_ID OR @USER_ID IS NULL)
GROUP BY HH.MANDALID, 
       HH.VILLAGEID, 
	   HH.PANCHAYATID, 
	   HH.HABITATIONID, 
	   B.DISTRICTNAME,
	   B.MANDALNAME,
       B.PANCHAYATNAME,
       B.VILLAGENAME,
	   HH.HOUSE_NO, 
	   HH.NewAutoID,
	   HH.NEWAUTO_ID_AR,
	   INFORMANT_NAME
) AS A	   	
LEFT JOIN DBO.HHS_PENISON_VULNERABLE_HHDB D ON(A.AUTO_ID=D.NewAutoID AND A.AMARAVATHIID=D.NEWAUTO_ID_AR) 
) AS B
where (b.[Is Vulnerable Family]=@IS_VULNERABLE_FAMILY or @IS_VULNERABLE_FAMILY='00' OR @IS_VULNERABLE_FAMILY IS NULL)