(select 
Funglbgetrutpac(rpa.pac_pac_numero) rut_pac,   
rpa.CON_CON_CODIGO Cod_Convenio,
rpa.rpa_for_fechadigit,
rpa.rpa_for_numerformu,
p.ATE_PRE_CODIGO,
pr.PRE_PRE_DESCRIPCIO,
s.PRE_TIP_DESCRIPCIO,
rpa.rpa_for_fechatencion,
case   (p.ATE_PRE_CODIGO) when '931001  ' then 'AGRUPADO' 
                          when '890311  ' then 'AGRUPADO'
                          when '933501  ' then 'AGRUPADO'
                          when '933601  ' then 'AGRUPADO' 
                          when '869501  ' then 'AGRUPADO' 
                          when '869500E ' then 'AGRUPADO' 
                          when '965901F ' then 'AGRUPADO' 
                          when '869500G ' then 'AGRUPADO'
                          when '869500B ' then 'AGRUPADO'
                          when '965901A ' then 'AGRUPADO' 
                          when '869500G ' then 'AGRUPADO'
                          when '965901F ' then 'AGRUPADO'
                          when '869500E ' then 'AGRUPADO'
                          when '839600  ' then 'AGRUPADO'
                          when '861401  ' then 'AGRUPADO'
                          when '048102  ' then 'AGRUPADO'
                          when '861411  ' then 'AGRUPADO'
                          when '964900  ' then 'AGRUPADO'
                          ELSE 'INDIVIDUAL'
 end
                           tipo_formulario
                            
from 
rpa_formulario rpa,
con_convenio c,
ate_prestacion p,
pre_prestacion pr,
PRE_Tipo s 

WHERE  
Trunc(rpa.rpa_for_fechatencion) >= To_date('2008/01/01', 'yyyy/mm/dd')
AND Trunc(rpa.rpa_for_fechatencion) <= Last_day(
        To_date('2024/02/06', 'yyyy/mm/dd'))
        AND rpa.rpa_for_tipoformu = '02  '
       AND rpa.rpa_for_vigencia <> 'N'
       AND rpa.pac_pac_numero NOT IN( 1308, 29062, 5024, 40487,
                                      43624, 1917, 19058 )
       AND rpa.rpa_for_fechatencion <> To_date('1900/01/01', 'yyyy/mm/dd')
       AND rpa.fac_fac_fechafacturacion = To_date('1900/01/01', 'yyyy/mm/dd')
       AND rpa.con_con_codigo <> 'CP      '
       AND rpa.con_con_codigo = c.con_con_codigo
       and rpa.rpa_for_urgencia <> 'S' AND rpa.rpa_for_urgencia <>'H'
       and p.ATE_PRE_NUMERFORMU=rpa.RPA_FOR_NUMERFORMU
       and pr.PRE_PRE_CODIGO=p.ATE_PRE_CODIGO
       and s.PRE_TIP_TIPO=pr.PRE_PRE_TIPO
       AND ATE_PRE_CODIGO <> 'A990    '
       --AND rpa_for_numerformu ='2311019759'
       
  )     
 union
 (select 
Funglbgetrutpac(rpa.pac_pac_numero) rut_pac,   
rpa.CON_CON_CODIGO Cod_Convenio,
rpa.rpa_for_fechadigit,
rpa.rpa_for_numerformu,
p.ATE_INS_CODIGO,
pr.FLD_PRODUCTOGLOSA,
decode (ATC_EST_NUMERO, '0', 'MEDICAMENTOS'), 
rpa.rpa_for_fechatencion,
(case when 
(ATC_EST_NUMERO) = '0' then 'INDIVIDUAL'
end)tipo_formulario
from 
rpa_formulario rpa,
con_convenio c,
ate_insumos p,
aba_producto pr
WHERE  
Trunc(rpa.rpa_for_fechatencion) >= To_date('2008/01/01', 'yyyy/mm/dd')
AND Trunc(rpa.rpa_for_fechatencion) <= Last_day(
        To_date('2024/02/06', 'yyyy/mm/dd'))
        AND rpa.rpa_for_tipoformu = '02  '
       AND rpa.rpa_for_vigencia <> 'N'
       AND rpa.pac_pac_numero NOT IN( 1308, 29062, 5024, 40487,
                                      43624, 1917, 19058 )
       AND rpa.rpa_for_fechatencion <> To_date('1900/01/01', 'yyyy/mm/dd')
       AND rpa.fac_fac_fechafacturacion = To_date('1900/01/01', 'yyyy/mm/dd')
       AND rpa.con_con_codigo <> 'CP      '
       AND rpa.con_con_codigo = c.con_con_codigo
       and rpa.rpa_for_urgencia <> 'S' AND rpa.rpa_for_urgencia <>'H'
       and p.ATE_INS_NUMERFORMU=rpa.RPA_FOR_NUMERFORMU
       and pr.FLD_PRODUCTOCODIGO=p.ATE_INS_CODIGO
       --and s.PRE_TIP_TIPO=pr.PRE_PRE_TIPO
       --AND rpa_for_numerformu ='2311019759')
       )