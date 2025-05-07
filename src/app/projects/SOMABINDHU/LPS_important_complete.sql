exec GET_REGISTRATION_AGREEMENT_SY_WISE_DETAILS @AADHAARNO=N'780930528850',@MANDALID=N'10',@VILLAGEID=N'021',@REFERENCEID=N'',@LandType=1,@OwnerType=N'S',@FLAG=N'R'


exec GET_REGISTRATION_AGREEMENT_SY_WISE_DETAILS_NOWLUR @AADHAARNO=N'634920092086',@MANDALID=N'12',@VILLAGEID=N'003',@REFERENCEID=N'REG1200365840',@LandType=3,@OwnerType=N'S',@UNITID=N'UNIT-03'

exec Get_CRDA_GallaryImagesCnt 

exec GET_914_REFERENCE_NO @MANDALID=N'12',@VILLAGEID=N'003',@UNITID=N'UNIT-03',@AADHAARNUMBER=N'352342744479,375057758600,526400434099,634920092086,784396481790'
exec GET_RegistrationAgreementDetails_Nowlur @MandalId=N'12',@UnitId=N'UNIT-03',@VillageId=N'003',@AadhaarNumber=N'784396481790',@LandType=3
exec GET_REGISTRATION_AGREEMENT_SY_WISE_DETAILS_NOWLUR @AADHAARNO=N'526400434099',@MANDALID=N'12',@VILLAGEID=N'003',@REFERENCEID=N'REG1200365840',@LandType=3,@OwnerType=N'S',@UNITID=N'UNIT-03'
exec GET_SUPPLY_DEED_REQUESTS_PRINT_NOWLUR @MandalId=N'12',@UnitId=N'UNIT-03',@VillageId=N'003',@LANDTYPE=3,@FLAG=N'C'

Select * from VW_LPS_SINGLE_MULTIPLE_ALL a With(Nolock)
Select  distinct a.PAID_STATUS,count(1) from VW_LPS_SINGLE_MULTIPLE_ALL a With(Nolock)
Group by a.PAID_STATUS

exec GET_SUPPLY_DEED_REQUESTS_PRINT @MandalId=N'11',@UnitId=N'UNIT-09',@VillageId=N'001',@LANDTYPE=3,@FLAG=N'R'

SELECT DISTINCT                           
 FP.MandalName AS FP_MandalId,            
 --FP_UnitId,            
 FP.REVVILLAGE AS FP_VillageId,            
 FP_FatherName,FP_FarmerName,@Age as FP_Age,        
 DBO.FN_GET_MASK_DATA(FP_AadhaarNumber)FP_AadhaarNumber,        
 MO.Occupation_Dis AS FP_Designation,                          
 --   B.Occupation_Dis AS FP_Occupation,                          
 SP_AuthorisedPersonFather,SP_Age,SP_AuthorisedPersonName,        
 DBO.FN_GET_MASK_DATA(SP_AadhaarNumber)SP_AadhaarNumber,        
 @CAName AS  CA_NAME,                        
 DBO.FN_GET_MASK_DATA(@CAAadhaar)CA_AadhaarNumber,        
 RD.MandalName AS RD_MandalId,RD.REVVILLAGE AS RD_VillageId,RD_SurveyNumber,            
 cast(RD_Acers as DECIMAL(18,4))RD_Acers,            
 isnull(RD_TanakaNo,'NA') RD_TanakaNo,                        
 isnull(CONVERT(VARCHAR,RD_TANAKADATE,103),'NA')AS RD_TANAKADATE,            
 /*CONVERT(VARCHAR,RD_Date,103)*/ CONVERT(VARCHAR,GETDATE(),103) RD_Date,            
 isnull(RD_SubRegistrarNumber,'NA') RD_SubRegistrarNumber,            
 isnull(RD_Sl_No_From,'NA') RD_Sl_No_From,            
 isnull(RD_Sl_No_To,'NA') RD_Sl_No_To,            
 isnull(RD_VolumeNumber,'NA') RD_VolumeNumber,            
 --isnull(RD_FirstPartyTotalLand,'NA') RD_FirstPartyTotalLand,                           
 CAST(RD_ACERS AS DECIMAL(18,4)) RD_FIRSTPARTYTOTALLAND,                           
 FS_SubDivision,            
 FS.mandal_description AS FS_MandalId,            
 FS_DoorNo, FS_TotalExtent,FS_PattaNo,FS_Extent,FS_East,FS_West,FS_North,FS_South,FS_Acres,FS_Hectors,            
 SSR.REVVILLAGE AS SS_R_VillageId,             
 SSRP.Panchayat_Name AS SS_R_Panchayat,            
 SS_R_East,SS_R_West,SS_R_North,SS_R_South,SS_R_SqYds,SS_R_SqMts,            
 SSC.REVVILLAGE AS SS_C_VillageId,            
 SSCP.Panchayat_Name AS SS_C_PanchayatId,            
 SS_C_East,SS_C_West,SS_C_North,SS_C_South,SS_C_SqYds,SS_C_SqMts,                          
 case when a.Other_Remarks_Residential = '' then 'NA' else isnull(a.Other_Remarks_Residential,'NA') end Other_Remarks_Residential,                        
 case when a.Other_Remarks_Commercial = '' then 'NA' else  isnull(a.Other_Remarks_Commercial,'NA') end Other_Remarks_Commercial             
 FROM RegistrationAgreementDetails A                          
 --  LEFT JOIN MASTER_OCCUPATION B ON(A.FP_Occupation=B.OccupationID)                           
 LEFT JOIN Unit_Master_Plot FP ON(A.FP_MandalId=FP.MandalID AND A.FP_VillageId=FP.VillageID) --AND A.FP_UnitId=FP.UnitID)                          
 LEFT JOIN Unit_Master_Plot RD ON(A.RD_MandalId=RD.MandalID AND A.RD_VillageId=RD.VillageID) --AND A.FP_UnitId=RD.UnitID)                          
 LEFT JOIN Mandal FS ON(A.FS_MandalId=FS.Mandal_ID AND FS.Man_District_ID='07')          
 LEFT JOIN Unit_Master_Plot SSR ON(A.RD_MandalId=SSR.MandalId AND A.SS_R_VillageId=SSR.VillageID)                          
 LEFT JOIN Unit_Master_Plot SSC ON(A.RD_MandalId=SSC.MandalID AND A.SS_C_VillageId=SSC.VillageID)                 
 LEFT JOIN MasterPanchayat SSRP ON(A.RD_MandalId=SSRP.Mandal_code AND  SSRP.Panchayat_Code=A.SS_R_Panchayat AND SSRP.District_Code='07')                      
 LEFT JOIN MasterPanchayat SSCP ON(A.RD_MandalId=SSCP.Mandal_code AND SSCP.Panchayat_Code=A.SS_C_PanchayatId AND SSCP.District_Code='07')                          
 LEFT JOIN Master_occupation MO ON(A.FP_Designation=MO.OccupationID)            
         
 WHERE FP_MandalId=@MandalId                         
 AND FP_VillageId=@VillageId               
 and Land_Type= @LandType           
 AND FP_AadhaarNumber in (select value from Udf_Split(@AadhaarNumber,','))

----------
SELECT LandMandal,LandVillage,        
 DBO.FN_GET_MASK_DATA(AadhaarNumber)AadhaarNumber,        
 DISTRICT,MANDAL,VILLAGE ,        
  (select dbo.InitCap(STATENAME)) as 'STATENAME',                    
 (select dbo.InitCap(DISTRICTNAME)) as 'DISTRICTNAME',                  
 (select dbo.InitCap(MANDALNAME)) as 'MANDALNAME',                  
 (select dbo.InitCap(VILLAGENAME)) as 'VILLAGENAME',DOORNO                  
 FROM                   
 (SELECT ROW_NUMBER() OVER (PARTITION BY LandMandal,LandVillage,AadhaarNumber ORDER BY AadhaarNumber) AS 'RN',* FROM #AA) A                  
 WHERE RN=1  and A.AadhaarNumber  IN (select * from dbo.fnSplitString(@AadhaarNumber,','))  AND A.LandMandal=@MandalId               
 AND A.LandVillage=@VillageId and a.LandType= @LandType

--------

exec GET_RegistrationAgreementDetails @MandalId=N'11',@UnitId=N'UNIT-09',@VillageId=N'001',@AadhaarNumber=N'649310610737',@LandType=3

---------
SELECT *,DENSE_RANK() OVER (ORDER BY AADHAARNO) R_NO                 
  FROM(                
  SELECT UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                            
  LandType,SurveyNo,SUM(CAST(RowWiseExtent AS DECIMAL(18,4)))RowWiseExtent,PATTANO,        
  SUBSTRING(CAST(SUM(CAST(Hectors AS DECIMAL(18,7))) AS VARCHAR(15)),1,6) Hectors,SubDivision,East,West,North,South,                                                     
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
  INNER JOIN Unit_Master_Plot_Lottery B on(A.LandMandal=B.MandalId AND LandVillage=B.VillageID)                            
  INNER JOIN APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL c on(a.AADHAARNO=c.AadhaarNumber and a.LPSROWID=c.ROWID --and a.SurveyNo=c.SurveyNo                       
  --AND CONVERT(DECIMAL(18,4),A.RowWiseExtent)=CONVERT(DECIMAL(18,4),C.ROWWISEEXTENT )                           
  and a.LandMandal=c.LandMandal and a.LandVillage=c.LandVillage and a.LandType=c.LandType AND c.ROWWISEEXTENT<>0)                            
  WHERE a.LANDMANDAL=@MANDALID                             
  AND a.LANDVILLAGE=@VILLAGEID                              
  AND a.LandType IN(SELECT ITEMS FROM DBO.SPLIT(@LandType,',')) --AND C.OWNERTYPE=@OWNERTYPE --and a.LPSROWID=57778                        
  and AADHAARNO in (select LTRIM(RTRIM(value)) value from udf_split(@AADHAARNO,','))                
  )AS A                
  GROUP BY UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                            
  LandType,SurveyNo,PATTANO,SubDivision,East,West,North,South,  LandCategory                  
  )AS B
-----------
SELECT *,DENSE_RANK() OVER (ORDER BY AADHAARNO) R_NO           
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
  WHERE a.LANDMANDAL=@MANDALID                       
  AND a.LANDVILLAGE=@VILLAGEID AND OWNERTYPE=@OwnerType                      
  AND a.LandType IN (1,2,3)  --and a.LPSROWID=57778                  
  and AADHAARNO in (select LTRIM(RTRIM(value)) value from udf_split(@AADHAARNO,','))          
   )AS A          
  GROUP BY UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                      
  LandType,SurveyNo,PATTANO,SubDivision,East,West,North,South,                     
  LandCategory            
  )AS B

--------
SELECT LANDMANDAL,LANDVILLAGE, NULL UNITID,B.REVVILLAGE AS VillageName, @AadhaarNumber AS AadhaarNumber,  
ISNULL(STUFF((SELECT  DISTINCT ',' + ISNULL(V1.APPLICATIONNUMBER,'NA')  
      FROM VW_LPS_SINGLE_MULTIPLE_ALL V1 WITH(NOLOCK)  
                    WHERE LandMandal=A.LandMandal  
       AND LandVillage=A.LandVillage  
       AND (UNITID=@UNITID OR @UNITID IS NULL)  
       AND PAID_STATUS='N' and ROWWISEEXTENT >0 
       --AND AadhaarNumber=A.AadhaarNumber  
       AND AadhaarNumber IN(SELECT ITEMS FROM DBO.SPLIT(@AadhaarNumber,',') )  
             FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,''),'NA') APPLICATIONNUMBER,  
ISNULL(STUFF((SELECT  DISTINCT ',' + ISNULL(CONVERT(VARCHAR,V1.FINALISEDDATE,103),'NA')  
      FROM VW_LPS_SINGLE_MULTIPLE_ALL V1 WITH(NOLOCK)  
                    WHERE LandMandal=A.LandMandal  
       AND LandVillage=A.LandVillage  
       AND (UNITID=@UNITID OR @UNITID IS NULL)  
       AND PAID_STATUS='N' and ROWWISEEXTENT >0 
       AND V1.FINALISEDDATE IS NOT NULL  
       --AND AadhaarNumber=A.AadhaarNumber  
       AND AadhaarNumber IN(SELECT ITEMS FROM DBO.SPLIT(@AadhaarNumber,',') )  
             FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,''),'NA') PRINTDATE  
    --INTO #TEMP_914_REFERENCE_NO  
  FROM VW_LPS_SINGLE_MULTIPLE_ALL A   
  INNER JOIN Unit_Master_Plot_Lottery B ON(A.LandMandal=B.MandalId AND A.LandVillage=B.VillageID   
   AND A.UNITID=(CASE WHEN B.MandalId='12' AND B.VillageID='003' THEN B.UnitID  
                 ELSE A.UNITID   
     END ))  
 WHERE LANDMANDAL=@MANDALID  
   AND LANDVILLAGE=@VILLAGEID  
   AND (A.UNITID=@UNITID OR @UNITID IS NULL)  
   AND PAID_STATUS='N' and ROWWISEEXTENT >0
   AND A.AadhaarNumber IN(SELECT ITEMS FROM DBO.SPLIT(@AadhaarNumber,',') )  
GROUP BY LANDMANDAL,LANDVILLAGE,B.REVVILLAGE--,AadhaarNumber  
   --AND PRINTDATE IS NOT NULL  
ORDER BY LANDMANDAL,LANDVILLAGE


----------
exec Insert_Browser @Type=N'Chrome135',@Browser=N'Chrome',@version=N'135.0',@IpAddress=N'193.186.4.137',@Platform=N'WinNT',@FormUrl=N'https://crda.ap.gov.in/apcrdav2/views/home.aspx',@CreatedBy=N'HomePage'

-----------

exec PopulateLandMaNDALS 

------------

exec POPULATEREFERENCENOS @MandalId=N'10',@UnitId=N'UNIT-19',@VillageId=N'014'
--------------
exec GetActiveNotifications @roleid=N'',@status=N'Y',@fromdate=N'',@todate=N'',@wheretoget=N'News and Events',@TendersDept=N''
-----------
exec GETREFERENCEDATA @APPLICATIONNO=N'UNIT2503034488',@Mandal=N'10',@Unit=N'UNIT-19',@Village=N'014',@Flag=N'UN'


set @CAName=(select top 1 CaName from LPS_CA_DETAILS where UnitID in(select distinct FP_UnitId from RegistrationAgreementDetails        
where FP_AadhaarNumber in (select value from Udf_Split(@AadhaarNumber,',')) and FP_MandalId=@MandalID AND FP_VillageId=@VillageId) )

set @CAAadhaar=(select top 1 AadhaarNumber from LPS_CA_DETAILS where UnitID in(select distinct FP_UnitId from RegistrationAgreementDetails        
where FP_AadhaarNumber in (select value from Udf_Split(@AadhaarNumber,',')) and FP_MandalId=@MandalID AND FP_VillageId=@VillageId))

SELECT DISTINCT                           
 FP.MandalName AS FP_MandalId,            
 --FP_UnitId,            
 FP.REVVILLAGE AS FP_VillageId,            
 FP_FatherName,FP_FarmerName,@Age as FP_Age,        
 DBO.FN_GET_MASK_DATA(FP_AadhaarNumber)FP_AadhaarNumber,        
 MO.Occupation_Dis AS FP_Designation,                          
 --   B.Occupation_Dis AS FP_Occupation,                          
 SP_AuthorisedPersonFather,SP_Age,SP_AuthorisedPersonName,        
 DBO.FN_GET_MASK_DATA(SP_AadhaarNumber)SP_AadhaarNumber,        
 @CAName AS  CA_NAME,                        
 DBO.FN_GET_MASK_DATA(@CAAadhaar)CA_AadhaarNumber,        
 RD.MandalName AS RD_MandalId,RD.REVVILLAGE AS RD_VillageId,RD_SurveyNumber,            
 cast(RD_Acers as DECIMAL(18,4))RD_Acers,            
 isnull(RD_TanakaNo,'NA') RD_TanakaNo,                        
 isnull(CONVERT(VARCHAR,RD_TANAKADATE,103),'NA')AS RD_TANAKADATE,            
 /*CONVERT(VARCHAR,RD_Date,103)*/ CONVERT(VARCHAR,GETDATE(),103) RD_Date,            
 isnull(RD_SubRegistrarNumber,'NA') RD_SubRegistrarNumber,            
 isnull(RD_Sl_No_From,'NA') RD_Sl_No_From,            
 isnull(RD_Sl_No_To,'NA') RD_Sl_No_To,            
 isnull(RD_VolumeNumber,'NA') RD_VolumeNumber,            
 --isnull(RD_FirstPartyTotalLand,'NA') RD_FirstPartyTotalLand,                           
 CAST(RD_ACERS AS DECIMAL(18,4)) RD_FIRSTPARTYTOTALLAND,                           
 FS_SubDivision,            
 FS.mandal_description AS FS_MandalId,            
 FS_DoorNo, FS_TotalExtent,FS_PattaNo,FS_Extent,FS_East,FS_West,FS_North,FS_South,FS_Acres,FS_Hectors,            
 SSR.REVVILLAGE AS SS_R_VillageId,             
 SSRP.Panchayat_Name AS SS_R_Panchayat,            
 SS_R_East,SS_R_West,SS_R_North,SS_R_South,SS_R_SqYds,SS_R_SqMts,            
 SSC.REVVILLAGE AS SS_C_VillageId,            
 SSCP.Panchayat_Name AS SS_C_PanchayatId,            
 SS_C_East,SS_C_West,SS_C_North,SS_C_South,SS_C_SqYds,SS_C_SqMts,                          
 case when a.Other_Remarks_Residential = '' then 'NA' else isnull(a.Other_Remarks_Residential,'NA') end Other_Remarks_Residential,                        
 case when a.Other_Remarks_Commercial = '' then 'NA' else  isnull(a.Other_Remarks_Commercial,'NA') end Other_Remarks_Commercial             
 FROM RegistrationAgreementDetails A                          
 --  LEFT JOIN MASTER_OCCUPATION B ON(A.FP_Occupation=B.OccupationID)                           
 LEFT JOIN Unit_Master_Plot FP ON(A.FP_MandalId=FP.MandalID AND A.FP_VillageId=FP.VillageID) --AND A.FP_UnitId=FP.UnitID)                          
 LEFT JOIN Unit_Master_Plot RD ON(A.RD_MandalId=RD.MandalID AND A.RD_VillageId=RD.VillageID) --AND A.FP_UnitId=RD.UnitID)                          
 LEFT JOIN Mandal FS ON(A.FS_MandalId=FS.Mandal_ID AND FS.Man_District_ID='07')          
 LEFT JOIN Unit_Master_Plot SSR ON(A.RD_MandalId=SSR.MandalId AND A.SS_R_VillageId=SSR.VillageID)                          
 LEFT JOIN Unit_Master_Plot SSC ON(A.RD_MandalId=SSC.MandalID AND A.SS_C_VillageId=SSC.VillageID)                 
 LEFT JOIN MasterPanchayat SSRP ON(A.RD_MandalId=SSRP.Mandal_code AND  SSRP.Panchayat_Code=A.SS_R_Panchayat AND SSRP.District_Code='07')                      
 LEFT JOIN MasterPanchayat SSCP ON(A.RD_MandalId=SSCP.Mandal_code AND SSCP.Panchayat_Code=A.SS_C_PanchayatId AND SSCP.District_Code='07')                          
 LEFT JOIN Master_occupation MO ON(A.FP_Designation=MO.OccupationID)            
         
 WHERE FP_MandalId=@MandalId                         
 AND FP_VillageId=@VillageId               
 and Land_Type= @LandType           
 AND FP_AadhaarNumber in (select value from Udf_Split(@AadhaarNumber,','))



SELECT LandMandal,LandVillage,        
 DBO.FN_GET_MASK_DATA(AadhaarNumber)AadhaarNumber,        
 DISTRICT,MANDAL,VILLAGE ,        
  (select dbo.InitCap(STATENAME)) as 'STATENAME',                    
 (select dbo.InitCap(DISTRICTNAME)) as 'DISTRICTNAME',                  
 (select dbo.InitCap(MANDALNAME)) as 'MANDALNAME',                  
 (select dbo.InitCap(VILLAGENAME)) as 'VILLAGENAME',DOORNO                  
 FROM                   
 (SELECT ROW_NUMBER() OVER (PARTITION BY LandMandal,LandVillage,AadhaarNumber ORDER BY AadhaarNumber) AS 'RN',* FROM #AA) A                  
 WHERE RN=1  and A.AadhaarNumber  IN (select * from dbo.fnSplitString(@AadhaarNumber,','))  AND A.LandMandal=@MandalId               
 AND A.LandVillage=@VillageId and a.LandType= @LandType



SELECT *,DENSE_RANK() OVER (ORDER BY AADHAARNO) R_NO                 
  FROM(                
  SELECT UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                            
  LandType,SurveyNo,SUM(CAST(RowWiseExtent AS DECIMAL(18,4)))RowWiseExtent,PATTANO,        
  SUBSTRING(CAST(SUM(CAST(Hectors AS DECIMAL(18,7))) AS VARCHAR(15)),1,6) Hectors,SubDivision,East,West,North,South,                                                     
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
  INNER JOIN Unit_Master_Plot_Lottery B on(A.LandMandal=B.MandalId AND LandVillage=B.VillageID)                            
  INNER JOIN APCRDA..VW_LPS_SINGLE_MULTIPLE_ALL c on(a.AADHAARNO=c.AadhaarNumber and a.LPSROWID=c.ROWID --and a.SurveyNo=c.SurveyNo                       
  --AND CONVERT(DECIMAL(18,4),A.RowWiseExtent)=CONVERT(DECIMAL(18,4),C.ROWWISEEXTENT )                           
  and a.LandMandal=c.LandMandal and a.LandVillage=c.LandVillage and a.LandType=c.LandType AND c.ROWWISEEXTENT<>0)                            
  WHERE a.LANDMANDAL=@MANDALID                             
  AND a.LANDVILLAGE=@VILLAGEID                              
  AND a.LandType IN(SELECT ITEMS FROM DBO.SPLIT(@LandType,',')) --AND C.OWNERTYPE=@OWNERTYPE --and a.LPSROWID=57778                        
  and AADHAARNO in (select LTRIM(RTRIM(value)) value from udf_split(@AADHAARNO,','))                
  )AS A                
  GROUP BY UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                            
  LandType,SurveyNo,PATTANO,SubDivision,East,West,North,South,  LandCategory                  
  )AS B



SELECT *,DENSE_RANK() OVER (ORDER BY AADHAARNO) R_NO           
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
  WHERE a.LANDMANDAL=@MANDALID                       
  AND a.LANDVILLAGE=@VILLAGEID AND OWNERTYPE=@OwnerType                      
  AND a.LandType IN (1,2,3)  --and a.LPSROWID=57778                  
  and AADHAARNO in (select LTRIM(RTRIM(value)) value from udf_split(@AADHAARNO,','))          
   )AS A          
  GROUP BY UnitID,UnitName,LandMandal,LandVillage,ReferenceID,AADHAARNO,                      
  LandType,SurveyNo,PATTANO,SubDivision,East,West,North,South,                     
  LandCategory            
  )AS B


exec GET_914_REFERENCE_NO @MANDALID=N'10',@VILLAGEID=N'003',@UNITID=N'UNIT-26',@AADHAARNUMBER=N'584138236335'

SELECT LANDMANDAL,LANDVILLAGE, NULL UNITID,B.REVVILLAGE AS VillageName, @AadhaarNumber AS AadhaarNumber,  
ISNULL(STUFF((SELECT  DISTINCT ',' + ISNULL(V1.APPLICATIONNUMBER,'NA')  
      FROM VW_LPS_SINGLE_MULTIPLE_ALL V1 WITH(NOLOCK)  
                    WHERE LandMandal=A.LandMandal  
       AND LandVillage=A.LandVillage  
       AND (UNITID=@UNITID OR @UNITID IS NULL)  
       AND PAID_STATUS='N' and ROWWISEEXTENT >0 
       --AND AadhaarNumber=A.AadhaarNumber  
       AND AadhaarNumber IN(SELECT ITEMS FROM DBO.SPLIT(@AadhaarNumber,',') )  
             FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,''),'NA') APPLICATIONNUMBER,  
ISNULL(STUFF((SELECT  DISTINCT ',' + ISNULL(CONVERT(VARCHAR,V1.FINALISEDDATE,103),'NA')  
      FROM VW_LPS_SINGLE_MULTIPLE_ALL V1 WITH(NOLOCK)  
                    WHERE LandMandal=A.LandMandal  
       AND LandVillage=A.LandVillage  
       AND (UNITID=@UNITID OR @UNITID IS NULL)  
       AND PAID_STATUS='N' and ROWWISEEXTENT >0 
       AND V1.FINALISEDDATE IS NOT NULL  
       --AND AadhaarNumber=A.AadhaarNumber  
       AND AadhaarNumber IN(SELECT ITEMS FROM DBO.SPLIT(@AadhaarNumber,',') )  
             FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,''),'NA') PRINTDATE  
    --INTO #TEMP_914_REFERENCE_NO  
  FROM VW_LPS_SINGLE_MULTIPLE_ALL A   
  INNER JOIN Unit_Master_Plot_Lottery B ON(A.LandMandal=B.MandalId AND A.LandVillage=B.VillageID   
   AND A.UNITID=(CASE WHEN B.MandalId='12' AND B.VillageID='003' THEN B.UnitID  
                 ELSE A.UNITID   
     END ))  
 WHERE LANDMANDAL=@MANDALID  
   AND LANDVILLAGE=@VILLAGEID  
   AND (A.UNITID=@UNITID OR @UNITID IS NULL)  
   AND PAID_STATUS='N' and ROWWISEEXTENT >0
   AND A.AadhaarNumber IN(SELECT ITEMS FROM DBO.SPLIT(@AadhaarNumber,',') )  
GROUP BY LANDMANDAL,LANDVILLAGE,B.REVVILLAGE--,AadhaarNumber  
   --AND PRINTDATE IS NOT NULL  
ORDER BY LANDMANDAL,LANDVILLAGE





exec GetMyRunningJobs @ComputerName=N'CRDA-PROD-DB01',@JobType=1


exec GET_LPS_FORM_STATUS @USERID=N'INAVOLU-CA',@NAME=N'PENSION'
exec GetRoleBasedLinks @RoleID=N'UNIT',@SubModuleID=N'7',@ModuleID=N'5'

exec GET_LATESTMESSAGES 
exec GetActiveNotifications @roleid=N'',@status=N'Y',@fromdate=N'',@todate=N'',@wheretoget=N'Scrolling',@TendersDept=N''

select distinct                                                                 
 m.UNITID, m.UNITNAME,'Guntur' 'DistrictID', m.ApplicationNo as 'OptionID',                                                                        
--m.AADHAARNO, 
 dbo.FN_GET_MASK_DATA(m.AADHAARNO) AADHAARNO,
m.FARMERNAME,a.AllocatedPlotCode as 'ApplicationNumber',                     
CONVERT(NVARCHAR(50),Telugu_Village) as 'Telugu'  ,                                                              
                                                                        
a.MultipleQuantityID as 'PlotNumber',a.AllotmentID,                                                           
 --UPPER(m.PLOT_TYPE) 'AllocatedPlotCode'                          
 CONVERT(varchar,CreatedDate,105) 'AllocatedPlotCode'                          
 , convert(numeric(18,0),m.EXTENT_IN_SYARDS) as  'QUANTITY',a.MandalID,a.VillageID                                                                         
  INTO #A                                                                        
  from                                                                     
 CRDALotteryAllocationData..Lottery_Form918_Residential_FinalizedMasterData m with(nolock) inner join                                                                        
 CRDALotteryAllocationData..LotteryAlloted_Residential_FINAL_Data a with(nolock)                                                                                                                
  on a.ApplicationNumber = m.ApplicationNo and a.AllotmentID = m.AllotmentID and  m.MULTIPLEPLOTNUMBER = a.MultipleQuantityID                                                  
  inner join APCRDA..Unit_Master_Plot_Lottery Um with(Nolock) on m.MandalID=Um.MandalId and m.VillageId=Um.VillageID                                  
  and m.UNITID=(case when m.MandalID='12' and m.VillageID='003' then Um.UnitID else m.UNITID end)
==========
exec GET_BLOCKCHAIN_REPORT_RESIDENTIAL @Plot_Code=N'6-346-3256-31-H3'
==========

exec PR_GET_AADHAR_WISE_LPS_STATUS_RPT @AadhaarNumber=N''

exec GET_REQUESTS_SDEED_JAREEBU @AADHAARNO=N'833561994379',@MANDALID=N'11',@VILLAGEID=N'001',@ALLOTEDPLOTCODE=N'SPUNIT0902057572',@LANDTYPE=3

exec GET_LPS_CA_DETAILS @UNITID=N'UNIT-17'




pUBLIC pORTAL


exec Get_TendersDepartments 
exec GetAllConfigurationInfo 
exec BINDING_ARTICAL_SEARCH_NEW @Month=N'01',@Year=N'2016'
exec BINDING_ARTICAL_SEARCH_NEW @Month=N'12',@Year=N'2016'

GOS
exec DataGovsubmodulefile @ModuleID=N'10'

exec GetCapitalCityContacts 
exec Get_CRDA_CR_CCP_Directorandstaff_Contacts 


Public dashboard

exec GetNTRCanteenHeadCountDetails 
exec NTRDASHBOARD_LPSGRAPH 
exec GetDashBoardDisplaycount 
exec PLACEWISE_EMPLOYEECOUNT 
exec GetLandscapeAreaMasterDet @Desc_Id=0
exec GETANNUITYDASHBOARD_NEW 
exec GetDashboardOnetimeloanvillgwisedata 
exec GET_REG_DASHBOARD_DETAILS @VAL=1
exec GET_REG_DASHBOARD_DETAILS @VAL=0



Plot allotment details

exec PopulateLandMaNDALS 
exec GET_VILLAGE_MSTR_LOTTERY @MANDALID=N'12'

exec GetForm98_Villagewise_PlotLayouts @MandalId =N'12',@VillageID =N'006'
exec get_lotteryplots_data @MandalID=N'12',@VillageID=N'003-6',@Flag=N'RJ'
-- Ressidential Jareebu


Online Pensions search
----------------------

exec GETONLINEPENSIONLIST @MANDALID=N'00',@VILLAGEID=N'00',@MONTH=N'2',@STATUS=N'Y',@YEAR=N'2025'
IF((@MONTH='9' AND @YEAR='2017'))                
  begin                       
   SELECT ROW_NUMBER()OVER (ORDER BY AADHAARNO) AS Row,
   M.mandal_description 'MANDAL',                          
   UPPER(LEFT(T.VILLAGENAME,1))+LOWER(SUBSTRING(T.VILLAGENAME,2,LEN(T.VILLAGENAME))) 'VILLAGE',                          
   DBO.FN_GET_MASK_DATA(T.REFERENCEID) AS PENSIONID,                                      
   T.INDIVIDUALNAME 'Name of the Pensioner',                                    
   DBO.FN_GET_MASK_DATA(T.AADHAARNO) AADHARNO,
   DBO.FN_GET_MASK_DATA(T.RATIONCARDNO)RATIONCARDNO,
   'Finalized by CA' REMARKS,T.AMOUNT 'AMOUNT' 
   FROM PENSIONDETAILS_MONTHWISE T WITH(NOLOCK)                           
   INNER JOIN APCRDA..MANDAL M WITH(NOLOCK) ON M.Man_District_ID='07' AND M.Mandal_ID=T.MANDALID                                    
   WHERE (T.MANDALID=@MANDALID OR '00' =@MANDALID ) AND (T.VILLAGEID=@VILLAGEID OR '00'=@VILLAGEID)                  
   and T.MONTH=@MONTH AND T.YEAR=@YEAR and T.MROFLAG='N'                              
   ORDER BY M.mandal_description,T.VILLAGENAME                 
  end                
  else                
  begin                
  SELECT ROW_NUMBER()OVER (ORDER BY AADHAARNO) AS Row,
  M.mandal_description 'MANDAL',                          
   UPPER(LEFT(T.VILLAGENAME,1))+LOWER(SUBSTRING(T.VILLAGENAME,2,LEN(T.VILLAGENAME))) 'VILLAGE',                          
   DBO.FN_GET_MASK_DATA(T.REFERENCEID) AS PENSIONID,                                      
   T.INDIVIDUALNAME 'Name of the Pensioner',                                    
   DBO.FN_GET_MASK_DATA(T.AADHAARNO) AADHARNO,
   DBO.FN_GET_MASK_DATA(T.RATIONCARDNO)RATIONCARDNO,
   'NA' REMARKS,T.AMOUNT 'AMOUNT' 
   FROM PENSIONDETAILS_MONTHWISE T WITH(NOLOCK)                           
   INNER JOIN APCRDA..MANDAL M WITH(NOLOCK) ON M.Man_District_ID='07' AND M.Mandal_ID=T.MANDALID                                    
   WHERE (T.MANDALID=@MANDALID OR '00' =@MANDALID ) AND (T.VILLAGEID=@VILLAGEID OR '00'=@VILLAGEID)                  
   and T.MONTH=@MONTH AND T.YEAR=@YEAR and DATASHARED='Y'                                
   ORDER BY M.mandal_description,T.VILLAGENAME                 
  end      

rEJECTED
----------------
exec GETONLINEPENSIONLIST @MANDALID=N'00',@VILLAGEID=N'00',@MONTH=N'00',@STATUS=N'R',@YEAR=N'00'

9.18 STATUS REPORT
------------------
exec DRYJAREEBU918AABSTRACTREPORT @LANDTYPE=N'00',@CATEGORY=N'00'

SELECT  ROW_NUMBER() OVER (ORDER BY U.UNITID) AS 'S.No',    
  U.UNITID,U.VILLAGENAME_NEW 'UNITNAME',U.REVVILLAGE,    
  ISNULL(COUNT( DISTINCT CASE WHEN  B.TDRFLAG = 'R' THEN  P.AADHAARNO  END),0) AS 'RESIDENTIALFARMERS',
  ISNULL(COUNT( DISTINCT CASE WHEN  B.TDRFLAG = 'R' THEN  P.PLOTROWID  END),0) AS 'ENTRYWISERESIDENTIALFARMERS',     
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' THEN P.RESIDENTIALSUM ELSE 0 END),0))) AS 'RESIDENTIALSUM',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' THEN P.RESIDENTIALGIVEN ELSE 0 END),0))) AS 'RESIDENTIALGIVEN',    
      
  ISNULL(COUNT( DISTINCT CASE WHEN   B.TDRFLAG = 'C' THEN  P.AADHAARNO  END),0) AS 'COMMERCIALFARMERS',  
  ISNULL(COUNT( DISTINCT CASE WHEN   B.TDRFLAG = 'C' THEN  P.PLOTROWID  END),0) AS 'ENTRYWISECOMMERCIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' THEN P.COMMERCIALSUM ELSE 0 END),0))) AS 'COMMERCIALSUM',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' THEN P.COMMERCIALGIVEN ELSE 0 END),0))) AS 'COMMERCIALGIVEN',    
      
  ISNULL(COUNT( DISTINCT CASE WHEN P.RESIDENTIALREMAINING >0 AND B.TDRFLAG = 'R' THEN  P.AADHAARNO END),0) AS 'RESIDENTIALREMAININGFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' AND P.RESIDENTIALREMAINING >0     
              THEN P.RESIDENTIALREMAINING ELSE 0 END),0))) AS 'RESIDENTIALREMAINING',    
  ISNULL(COUNT( DISTINCT CASE WHEN P.COMMERCIALREMAINING >0 AND B.TDRFLAG = 'C' THEN  P.AADHAARNO END),0) AS 'COMMERCIALREMAININGFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' AND P.COMMERCIALREMAINING >0     
              THEN P.COMMERCIALREMAINING ELSE 0 END),0))) AS 'COMMERCIALREMAINING',    
      
  ISNULL(COUNT( DISTINCT CASE WHEN P.RESIDENTIALREMAINING >0 AND B.TDRFLAG = 'R' AND B.TDR='JT'     
         THEN  P.AADHAARNO END),0) AS 'O1RESIDENTIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' AND P.RESIDENTIALREMAINING >0 AND B.TDR='JT'     
              THEN P.RESIDENTIALREMAINING ELSE 0 END),0))) AS 'O1RESIDENTIALREMAINING',    
                  
  ISNULL(COUNT( DISTINCT CASE WHEN P.COMMERCIALREMAINING >0 AND B.TDRFLAG = 'C' AND B.TDR='JT'    
         THEN  P.AADHAARNO END),0) AS 'O1COMMERCIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' AND P.COMMERCIALREMAINING >0 AND B.TDR='JT'    
              THEN P.COMMERCIALREMAINING ELSE 0 END),0))) AS 'O1COMMERCIALREMAINING',    
                  
  ISNULL(COUNT( DISTINCT CASE WHEN P.RESIDENTIALREMAINING >0 AND B.TDRFLAG = 'R' AND B.TDR='CR'     
         THEN  P.AADHAARNO END),0) AS 'O2RESIDENTIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' AND P.RESIDENTIALREMAINING >0 AND B.TDR='CR'     
              THEN P.RESIDENTIALREMAINING ELSE 0 END),0))) AS 'O2RESIDENTIALREMAINING',    
                  
  ISNULL(COUNT( DISTINCT CASE WHEN P.COMMERCIALREMAINING >0 AND B.TDRFLAG = 'C' AND B.TDR='CR'    
         THEN  P.AADHAARNO END),0) AS 'O2COMMERCIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' AND P.COMMERCIALREMAINING >0 AND B.TDR='CR'    
              THEN P.COMMERCIALREMAINING ELSE 0 END),0))) AS 'O2COMMERCIALREMAINING',    
                  
  ISNULL(COUNT( DISTINCT CASE WHEN P.RESIDENTIALREMAINING >0 AND B.TDRFLAG = 'R' AND B.TDR='TD'     
         THEN  P.AADHAARNO END),0) AS 'O3RESIDENTIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' AND P.RESIDENTIALREMAINING >0 AND B.TDR='TD'     
              THEN P.RESIDENTIALREMAINING ELSE 0 END),0))) AS 'O3RESIDENTIALREMAINING',    
                  
  ISNULL(COUNT( DISTINCT CASE WHEN P.COMMERCIALREMAINING >0 AND B.TDRFLAG = 'C' AND B.TDR='TD'    
         THEN  P.AADHAARNO END),0) AS 'O3COMMERCIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' AND P.COMMERCIALREMAINING >0 AND B.TDR='TD'    
              THEN P.COMMERCIALREMAINING ELSE 0 END),0))) AS 'O3COMMERCIALREMAINING'    
      
      
 FROM Unit_Master U    
 LEFT JOIN PLOTALLOTMENTDETAILS P ON P.UNITID=U.UnitID AND P.MANDALID=U.MandalId AND P.VILLAGEID=U.VillageID    
 LEFT JOIN PLOTALLOTMENTBLOCKS B ON P.AADHAARNO=B.AADHAARNO AND P.LANDTYPE=B.LANDTYPE    
  AND ((CONVERT(VARCHAR,P.LANDTYPE)=@LANDTYPE) OR '00'=@LANDTYPE)    
  AND ((CONVERT(VARCHAR,B.BLOCKTYPE)=@CATEGORY) OR '00'=@CATEGORY)    
 GROUP BY U.UnitID,U.VILLAGENAME_NEW,U.REVVILLAGE    
 ORDER BY U.UnitID    
 END    
 ELSE     
 BEGIN    
 SET @TYPE='2,3'    
 SELECT ROW_NUMBER() OVER (ORDER BY U.UNITID) AS 'S.No',      
  U.UNITID,U.VILLAGENAME_NEW 'UNITNAME',U.REVVILLAGE,    
  ISNULL(COUNT( DISTINCT CASE WHEN   B.TDRFLAG = 'R' THEN  P.AADHAARNO  END),0) AS 'RESIDENTIALFARMERS',
  ISNULL(COUNT( DISTINCT CASE WHEN  B.TDRFLAG = 'R' THEN  P.PLOTROWID  END),0) AS 'ENTRYWISERESIDENTIALFARMERS',     
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' THEN P.RESIDENTIALSUM ELSE 0 END),0))) AS 'RESIDENTIALSUM',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' THEN P.RESIDENTIALGIVEN ELSE 0 END),0))) AS 'RESIDENTIALGIVEN',    
  ISNULL(COUNT( DISTINCT CASE WHEN   B.TDRFLAG = 'C' THEN  P.AADHAARNO  END),0) AS 'COMMERCIALFARMERS',
  ISNULL(COUNT( DISTINCT CASE WHEN   B.TDRFLAG = 'C' THEN  P.PLOTROWID  END),0) AS 'ENTRYWISECOMMERCIALFARMERS',      
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' THEN P.COMMERCIALSUM ELSE 0 END),0))) AS 'COMMERCIALSUM',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' THEN P.COMMERCIALGIVEN ELSE 0 END),0))) AS 'COMMERCIALGIVEN',    
  ISNULL(COUNT( DISTINCT CASE WHEN P.RESIDENTIALREMAINING >0 AND B.TDRFLAG = 'R' THEN  P.AADHAARNO END),0) AS 'RESIDENTIALREMAININGFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' AND P.RESIDENTIALREMAINING >0 THEN P.RESIDENTIALREMAINING ELSE 0 END),0))) AS 'RESIDENTIALREMAINING',    
  ISNULL(COUNT( DISTINCT CASE WHEN P.COMMERCIALREMAINING >0 AND B.TDRFLAG = 'C' THEN  P.AADHAARNO END),0) AS 'COMMERCIALREMAININGFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' AND P.COMMERCIALREMAINING >0 THEN P.COMMERCIALREMAINING ELSE 0 END),0))) AS 'COMMERCIALREMAINING',    
  ISNULL(COUNT( DISTINCT CASE WHEN P.RESIDENTIALREMAINING >0 AND B.TDRFLAG = 'R' AND B.TDR='JT'     
         THEN  P.AADHAARNO END),0) AS 'O1RESIDENTIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' AND P.RESIDENTIALREMAINING >0 AND B.TDR='JT'     
              THEN P.RESIDENTIALREMAINING ELSE 0 END),0))) AS 'O1RESIDENTIALREMAINING',    
                  
  ISNULL(COUNT( DISTINCT CASE WHEN P.COMMERCIALREMAINING >0 AND B.TDRFLAG = 'C' AND B.TDR='JT'    
         THEN  P.AADHAARNO END),0) AS 'O1COMMERCIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' AND P.COMMERCIALREMAINING >0 AND B.TDR='JT'    
              THEN P.COMMERCIALREMAINING ELSE 0 END),0))) AS 'O1COMMERCIALREMAINING',    
  ISNULL(COUNT( DISTINCT CASE WHEN P.RESIDENTIALREMAINING >0 AND B.TDRFLAG = 'R' AND B.TDR='CR'     
         THEN  P.AADHAARNO END),0) AS 'O2RESIDENTIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' AND P.RESIDENTIALREMAINING >0 AND B.TDR='CR'     
              THEN P.RESIDENTIALREMAINING ELSE 0 END),0))) AS 'O2RESIDENTIALREMAINING',    
  ISNULL(COUNT( DISTINCT CASE WHEN P.COMMERCIALREMAINING >0 AND B.TDRFLAG = 'C' AND B.TDR='CR'    
         THEN  P.AADHAARNO END),0) AS 'O2COMMERCIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' AND P.COMMERCIALREMAINING >0 AND B.TDR='CR'    
              THEN P.COMMERCIALREMAINING ELSE 0 END),0))) AS 'O2COMMERCIALREMAINING',    
  ISNULL(COUNT( DISTINCT CASE WHEN P.RESIDENTIALREMAINING >0 AND B.TDRFLAG = 'R' AND B.TDR='TD'     
         THEN  P.AADHAARNO END),0) AS 'O3RESIDENTIALFARMERS',    
  CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'R' AND P.RESIDENTIALREMAINING >0 AND B.TDR='TD'     
              THEN P.RESIDENTIALREMAINING ELSE 0 END),0))) AS 'O3RESIDENTIALREMAINING',    
  ISNULL(COUNT( DISTINCT CASE WHEN P.COMMERCIALREMAINING >0 AND B.TDRFLAG = 'C' AND B.TDR='TD'    
         THEN  P.AADHAARNO END),0) AS 'O3COMMERCIALFARMERS',      CONVERT(DECIMAL(18,2),(ISNULL(SUM(CASE WHEN B.TDRFLAG = 'C' AND P.COMMERCIALREMAINING >0 AND B.TDR='TD'    
              THEN P.COMMERCIALREMAINING ELSE 0 END),0))) AS 'O3COMMERCIALREMAINING'    
    
 FROM Unit_Master U    
 LEFT JOIN PLOTALLOTMENTDETAILS P ON P.UNITID=U.UnitID AND P.MANDALID=U.MandalId AND P.VILLAGEID=U.VillageID    
 LEFT JOIN PLOTALLOTMENTBLOCKS B ON P.AADHAARNO=B.AADHAARNO AND P.LANDTYPE=B.LANDTYPE    
  AND (CONVERT(VARCHAR,P.LANDTYPE) IN (select * from dbo.fnSplitString(@TYPE,',')))    
  AND ((CONVERT(VARCHAR,B.BLOCKTYPE)=@CATEGORY) OR '00'=@CATEGORY)    
 GROUP BY U.UnitID,U.VILLAGENAME_NEW,U.REVVILLAGE    
 ORDER BY U.UnitID    
 END     

mUTATION CHRONOLOGICAL REPORT
---------------------------
exec GET_SUBMUTATION_DETAILS @MANDALID=N'12',@VILLAGEID=N'006',@UNITNAME=N'NIDAMARRU-1-CA',@UNIT=N'Nidamarru-1'

SELECT APPLICATION_NUMBER,A.MutationAppNo,PurchaserName,LandMandal,MANDAL_NAME,      
LandVillage,village_name,A.CreatedBy,SurveyNo,LandType,LandTypeDesc,LandCategory,LandCategoryDesc,FExtentLPSAcres,FExtentLPSCents,        
FExtentLPSSubCents,A.CreatedDate,
dbo.FN_GET_MASK_DATA(AadhaarNumber)AadhaarNumber      
FROM(       
SELECT  ParentAppNo+''+CAST(A.Sno AS VARCHAR(2)) APPLICATION_NUMBER,A.MutationAppNo,PurchaserName,LandMandal,M.mandal_description AS 'MANDAL_NAME',      
LandVillage,V.village_name,A.CreatedBy,SurveyNo,LandType,LT.LandTypeDesc,LandCategory,LC.LandCategoryDesc,FExtentLPSAcres,FExtentLPSCents,        
FExtentLPSSubCents,A.CreatedDate,
AadhaarNumber      
FROM APCRDA..MUTATIONTRACKDETAILS A WITH(NOLOCK)        
INNER JOIN   (SELECT  ParentAppNo+''+CAST(MAX(Sno) AS VARCHAR(2)) AS APPNO FROM APCRDA..MUTATIONTRACKDETAILS WITH(NOLOCK) GROUP BY      
 ParentAppNo ) B         
ON A.ParentAppNo+''+CAST(Sno AS VARCHAR(2))=B.APPNO   
INNER JOIN APCRDA..LPSFARMERDETAILS L ON L.ApplicationNumber=A.MutationAppNo       
INNER JOIN  MASTERLANDTYPE LT ON A.LandType=LT.LandTypeID        
INNER JOIN MASTERLANDCATEGORY LC ON A.LandCategory=LC.LandCategoryID        
INNER JOIN mandal M ON A.LandMandal=M.Mandal_ID AND '07'=M.Man_District_ID         
INNER JOIN village V ON  A.LandMandal=V.mandal_id AND A.LandVillage=V.village_id AND A.LandDistrict=V.district_id        
WHERE  A.MutationAppNo!='NA' AND ( LandMandal=@MANDALID OR '00'=@MANDALID) AND (LandVillage=@VILLAGEID OR '00'=@VILLAGEID)      
 AND (A.CreatedBy=@UNIT  OR '00'=@UNIT)        
GROUP by ParentAppNo+''+CAST(A.Sno AS VARCHAR(2)),A.MutationAppNo,PurchaserName,LandMandal,M.mandal_description,LandVillage,      
V.village_name,A.CreatedBy,SurveyNo,LandType,LT.LandTypeDesc,LandCategory, LC.LandCategoryDesc,FExtentLPSAcres,FExtentLPSCents,        
FExtentLPSSubCents,A.CreatedDate,L.AadhaarNumber     

lpoc mUTATION REQUESTS
------------------------
exec PR_GET_REG_PLOT_MUTATION_DETAILED_CA @MANDALID=N'12',@UNITID=N'UNIT-06',@VILLAGEID=N'006'


SELECT ROW_NUMBER()OVER(ORDER BY Unit_ID,VillageName)SNO,*     
FROM (    
 SELECT a.MandalId,    
  a.VillageID,    
  REVVILLAGE VillageName,    
  a.Unit_ID,    
 DBO.FN_GET_MASK_DATA(C.AADHAARNUMBER) AS  AADHAARNUMBER,     
 B.PLOT_MUTATION_NO,    
 DBO.FN_GET_MASK_DATA(B.AADHAARNUMBER) ORIGINAL_AADHAARNUMBER,    
 ISNULL(D.FARMER_NAME,'NA')FARMER_NAME,    
 ISNULL(D.FATHER_NAME,'NA')FATHER_NAME,    
 B.PLOT_CODE,    
 B.PLOT_TYPE_NAME,    
 (CASE WHEN B.LANDTYPEID=1 THEN 'Dry' ELSE 'Jareebu' END)LANDTYPE,    
 B.PLOT_SIZE,    
 B.SRO_NAME,    
 B.REG_DOC_NO,    
 B.REG_YEAR,  
 b.ID     
  FROM Unit_Master_Plot_Lottery A    
  INNER JOIN LPS_REG_PLOT_MUTATION B ON(A.MandalId=B.LANDMANDAL AND A.VillageID=B.LANDVILLAGE AND     
  A.Unit_ID=(CASE WHEN A.MandalId='12' AND A.VillageID='003' THEN B.UNITID ELSE A.Unit_ID END))    
  INNER JOIN LPSFARMERDETAILS_PLOT_MUTATION C ON(B.PLOT_MUTATION_NO=C.PLOT_MUTATION_NO)    
  LEFT JOIN PLOT_WISE_FARMERNAMES D ON(B.PLOT_CODE=D.PLOT_CODE)    
  WHERE B.IS_ACTIVE='Y' and b.CA_Flag is null   
    AND (A.MandalId=@MANDALID OR @MANDALID='00')    
    AND (A.VillageID=@VILLAGEID OR @VILLAGEID='00')    
    AND (A.UNITID=@UNITID OR @UNITID='00')    
     
)AS A    

fINALIZED mUTATIONRequests (Form -10)
----------------------------
exec GETFARMERDETAILS_FOREDIT_CA_UNIT_MUTATION @USERID=N'NIDAMARRU-1-CA',@VillageID=N'006',@OwnerType=N'S',@UNITID=N'UNIT-06'

SELECT L.ROWID,F.ApplicationNumber,F.AadhaarNumber,                                                  
                                                        
D.district_description 'Land District',                                              
m.mandal_description as 'Land Mandal',                                                  
v.village_name as 'Land Village',                       
L.RSRSurveyNo,L.RSRSubdivisionNo, F.FarmerName,                                      
L.SurveyNo,                                              
L.TotalExtent, L.TotalExtentCents,                                              
L.ExtentUnderLPS,L.ExtentUnderLPSCents,L.ExtentUnderLPSSubCents,L.KhataNo,L.LandCategory,L.LandType,L.GardenType                                            
        ,L.LandMandal,L.LandVillage,L.FExtentLPSAcres,L.FExtentLPSCents,L.FExtentLPSSubCents,                                
        C.LandCategoryDesc,T.LandTypeDesc,G.GardenName,'' as Remarks                                                                                                                           
FROM LPSFARMERDETAILS F WITH(NOLOCK)                                                  
INNER JOIN LPSFARMERLANDDETAILS L WITH(NOLOCK) ON L.ApplicationNumber=F.ApplicationNumber                      
LEFT JOIN MASTERLANDCATEGORY C ON C.LandCategoryID=L.LandCategory                          
LEFT JOIN MASTERLANDTYPE T ON T.LandTypeID=L.LandType                       
LEFT JOIN MASTERGARDEN G ON G.GardenID=L.GardenType                                                                 
LEFT JOIN DISTRICT D ON D.district_id=L.LandDistrict                                                  
LEFT JOIN mandal M ON M.Man_District_ID=D.district_id AND M.Mandal_ID=L.LandMandal                                                  
LEFT JOIN village V ON V.village_id=L.LandVillage AND V.mandal_id=M.Mandal_ID AND V.district_id=D.district_id         
INNER JOIN APCRDA..Unit_Master U on U.VILLAGENAME_NEW = L.CreatedBy                                                                    
WHERE L.CreatedBy=@ALIYASID and L.LandVillage=@VillageID and L.Flag='N' and L.CAFlag='Y' and U.UnitID=@UNITID  AND L.MU_FLAG='Y'                 
order by   F.ApplicationNumber desc 


Pention death cases upload
exec GETPENSIONDETAILSCA_DEATH @USERID=N'NIDAMARRU-1-CA',@Mandal=N'12',@Village=N'1'
 SELECT distinct
 P.ROWID,PV.VILLAGENAME,P.REFERENCEID AS 'PENSIONID',
 P.VILLAGEID,P.AADHAARNO,P.RATIONCARDNO,ISNULL(P.VOTERIDNO,'NA') AS 'VOTERIDNO',
 P.NAME,ISNULL(P.MOBILENO,'NA') AS 'MOBILENO',
 P.BANKNAME,P.BRANCHNAME,P.ACCOUNTNO,P.IFSCCODE,P.REMARKS,P.UPDATEDDATE,CAFLAG,
 CASE WHEN P.REFERENCEIDOLD LIKE 'PNS%' THEN 'Y'
   ELSE 'N'
 END AS 'MEESEVAFLAG'
 FROM APCRDA..PENSIONDETAILS P WITH(NOLOCK)                                        
 INNER JOIN APCRDA..PENSION_VILLAGEMASTER PV ON PV.VILLAGEID=P.VILLAGEID AND PV.MANDALID=P.MANDALID AND PV.DISTRICTID=P.DISTRICTID                                        
 WHERE           
 P.MANDALID=@Mandal AND P.VILLAGEID=@Village   and                         
 --CREATEDBY=@ALIYASID and                              
  CAFLAG in ('Y','N','R') AND IS_ACTIVE='Y'   

9.12
exec UNITWISE_FARMERDETAILS_RPT_912_PRINTER @MandalID=N'12',@VillageID=N'006'

SELECT DISTINCT    F.ApplicationNumber,JC.LandOwnerName AS 'FarmerName',F.Father_HusbandName AS 'C/O Name',                        
dbo.FN_GET_MASK_DATA(JC.AadharNo) AS 'AADHAR NO',isnull(jc.MobileNo,'NA') MobileNo,  
case when F.FORM912PRINTFLAG='Y' then 'Not Generated' when F.FORM912PRINTFLAG='N' then 'Generated' End AS 'Print Status'                                                        
FROM PaymentCheckListForCollectorJC JC                                    
INNER JOIN LPSFARMERDETAILS F ON JC.AadharNo=F.AadhaarNumber                     
AND F.IsLandinMultipleVillages='N'                     
WHERE MandalID=@MandalID and VillageID=@VillageID order by F.ApplicationNumber  

Signing Process for village wise Plots
exec GET_VILLAGE_WISE_FINAL_LIST @MANDALID=N'12',@VILLAGEID=N'006',@FLAG=N'DR',@SCHEDULE=N'1',@VILLAGENAME=N'Nidamarru'
secondLottery
exec GET_VILLAGE_WISE_FINAL_LIST @MANDALID=N'12',@VILLAGEID=N'006',@FLAG=N'DR',@SCHEDULE=N'2',@VILLAGENAME=N'Nidamarru'






exec GET_REG_SLOT_WISE_ABSTRACT_FOR_CA @FROM_DATE='2025-04-01 00:00:00',@TO_DATE='2025-04-16 00:00:00',@MANDALID=N'12',@VILLAGEID=N'006',@UNITID=N'UNIT-06',@Slot_Status=N'B'

 IF(@Slot_Status='B')  
  BEGIN
;WITH DATERANGE_CA(DateData) AS     
(    
    SELECT @FROM_DATE as Date    
    UNION ALL    
    SELECT DATEADD(d,1,DateData)    
    FROM DATERANGE_CA     
    WHERE DateData < @TO_DATE    
)    
    
SELECT     c.MandalId,    
     c.VillageID,    
     c.UnitID,    
     c.MandalName,    
     c.REVVILLAGE AS VillageName,  a.*    
  INTO #TEMPS_UMASTER_CA_1    
  FROM DATERANGE_CA a      
  cross join Unit_Master_Plot_Lottery c     
  WHERE C.MandalId=@MANDALID    
    AND C.VillageID=@VILLAGEID    
 AND (C.UnitID=@UNITID OR @UNITID IS NULL)    
  ORDER BY MandalName,VillageName,DATEDATA    
    
 SELECT DBO.FN_GET_SUB_REG_OFFICE_MASTER_NAME(A.MandalId,A.VillageID,A.UnitID) AS SRO_NAME,     
     CONVERT(VARCHAR,A.SLOT_DATES,103) SLOT_DATE,    
     [SLOTONE],    
      (SELECT DBO.FN_GET_SUB_REG_OFFICE_MASTER(A.MandalId,A.VillageID,A.UnitID)) AS SRO_ID    
         
 FROM(    
 SELECT A.MandalId,    
     A.VillageID,    
     A.UnitID,    
     DateData AS SLOT_DATES,      
  ISNULL(COUNT(DISTINCT B.PLOT_CODE),0) [SLOTONE]       
   FROM  #TEMPS_UMASTER_CA_1 A    
   LEFT JOIN REG_SLOT_BOOK_DETAILS  B ON(A.MANDALID=B.MandalId AND A.VILLAGEID=B.VillageID     
   AND A.UNITID=(CASE WHEN A.MandalId='12' AND A.VillageID='003' THEN B.UnitID ELSE A.UnitID END)  
   AND DATEDIFF(DD,A.DateData,B.SLOT_DATE)=0 AND B.ISACTIVE='Y' AND B.MANDALID=@MANDALID AND B.VILLAGEID=@VILLAGEID AND b.SLOT_STATUS<>'R')    
   GROUP BY A.MandalId,    
      A.VillageID,    
      A.UnitID,      
      A.DateData         
     )AS A      
ORDER BY SLOT_DATES    

unit wise residential and commercial Land details
exec GETRESICOMMDETAILS @userID=N'NIDAMARRU-1-CA',@MANID=N'12',@UNID=N'UNIT-06',@VILLID=N'006'



Record room

exec DOCUPLOAD_03032016 @FROMDATE=N'01/01/2015',@TODATE=N'04/16/2025'

exec DOCUPLOADSTATUSDETAILS_NEW @unitid=N'UNIT-02',@DocID=N'28',@Status=N'T',@unitname=N'Nowlur-1',@FromDate=N'01/01/2015',@ToDate=N'04/16/2025'
go

select  distinct L.ROWID AS 'S.No',l.UNITID,l.UNITNAME,
dbo.FN_GET_MASK_DATA(l.AadhaarNumber) AadhaarNumber,            
L.ApplicationNumber  as 'Total DOC',l.FarmerName,l.FatherName, l.RSRSurveyNo,l.RSRSubdivisionNo,l.SurveyNo,                   
M.LandTypeDesc 'LandType',C.LandCategoryDesc 'LandCategory',G.GardenName 'GardenType',l.ROWWISEEXTENT,l.ROWGARDENEXTENT                        
from VW_LPS_SINGLE_MULTIPLE_ALL L                   
LEFT join LandOwner_Documents D WITH(NOLOCK) on L.ApplicationNumber=D.ReferenceID            
LEFT JOIN MASTERLANDTYPE M ON M.LandTypeID=l.LandType            
LEFT JOIN MASTERLANDCATEGORY C ON C.LandCategoryID=L.LandCategory               
LEFT JOIN MASTERGARDEN G ON G.GardenID=L.GardenType                         
WHERE  UNITID is NOT NULL  and l.UNITID=@unitid             
ORDER BY l.ApplicationNumber    


Annuity details
exec GET_PAYMENTS_FOURTH_ANNUITY_ONLINE @MANDALID=N'12',@UNITID=N'UNIT-06',@VILLAGEID=N'006',@FLAG=N'R',@ANNUITY_YEAR=N'9',@AADHAARNO=NULL
exec GET_PAYMENTS_FOURTH_ANNUITY_ONLINE @MANDALID=N'12',@UNITID=N'UNIT-06',@VILLAGEID=N'006',@FLAG=N'M',@ANNUITY_YEAR=N'10',@AADHAARNO=NULL
exec GET_LPS_FORM_STATUS @USERID=N'NIDAMARRU-1-CA',@NAME=N'CAANNUITY'

 SELECT SNO AS ROWID,UNITID,MANDALID,VILLAGEID,UNITNAME,AadhaarNumber,        
 FarmerName,        
 AccountNo,        
 FatherName,        
 BankName,BranchName,IFSCCode,        
 ISNULL(NULLIF(MobileNumber,''),'NA')MobileNumber,      
 ''LandCategory,LandType,Extent,TOTAL_AMOUNT_3RD,BALANCEAMOUNT_3RD,GRANDTOTAL_3RD      
 ,''SURVEYNO,PLOT_CODE,PLOTTYPE ,Vendor       
 FROM APCRDA..SECOND_ANNUITY_DISTRIBUTION_PLOT_WISE WITH(NOLOCK)                      
 WHERE MANDALID=@MANDALID and UNITID=@UNITID and VILLAGEID=@VILLAGEID and MRO_FLAG='N' AND CA_FLAG='Y' and (AadhaarNumber=@AADHAARNO or @AADHAARNO is null)        
 --AND GRANDTOTAL_3RD>0                          
 ORDER BY FarmerName 




 Tables to be Imported:

LandOwner_Documents           
MASTERLANDTYPE
MASTERLANDCATEGORY
MASTERGARDEN
MASTER_ASSIGNEDLANDCATEGORIES
LPSFarmerlanddetails_ALL
LPS_AADHAR_WISE_VIRTUAL_ID_GENERATION
PaymentCheckListForCollectorJC
PENSION_VILLAGEMASTER
PENSIONDETAILS
LPS_REG_PLOT_MUTATION
LPSFARMERDETAILS_PLOT_MUTATION
PLOT_WISE_FARMERNAMES
MUTATIONTRACKDETAILS
PLOTALLOTMENTDETAILS
PLOTALLOTMENTBLOCKS
CRDALotteryAllocationData..Lottery_Form918_Residential_FinalizedMasterData
CRDALotteryAllocationData..LOTTERYALLOTED_Residential_FINAL_DATA
CRDALotteryAllocationData..LOTTERY_Residential_PLOTSMASTER
CRDALotteryAllocationData..Lottery_Form918_Residential_FinalizedMasterData_JAREEBU
CRDALotteryAllocationData..LOTTERYALLOTED_Residential_FINAL_DATA_JAREEBU
CRDALotteryAllocationData..LOTTERY_Residential_PLOTSMASTER_JAREEBU

CRDALotteryAllocationData..LOTTERY_Commercial_PLOTSMASTER
CRDALotteryAllocationData..Lottery_Form918_Commercial_FinalizedMasterData
CRDALotteryAllocationData..LOTTERYALLOTED_Commercial_FINAL_DATA
CRDALotteryAllocationData..LOTTERY_Commercial_PLOTSMASTER
CRDALotteryAllocationData..Lottery_Form918_Commercial_FinalizedMasterData_JAREEBU
CRDALotteryAllocationData..LOTTERYALLOTED_Commercial_FINAL_DATA_JAREEBU
CRDALotteryAllocationData..LOTTERY_Commercial_PLOTSMASTER_JAREEBU
CRDALotteryAllocationData..Lottery_Form918_Residential_FinalizedMasterData

Unit_Master_Plot_Lottery
 LPS_FORM_WISE_STATUS_DETAILS
 SECOND_ANNUITY_DISTRIBUTION_PLOT_WISE
 Lottery_Data_Signing_Process
REGISTRATION_SLOT_BOOKING_DETAILS
REG_SLOT_BOOK_DETAILS
DATERANGE_CA
REGISTRATIONAGREEMENTDETAILS_RESIDENTIAL
SRO_MASTER