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
                          when '862501' then 'AGRUPADO'
                        when '862703' then 'AGRUPADO'
                        when '862701D ' then 'AGRUPADO'
                        when '998703' then 'AGRUPADO'
                        when '863103' then 'AGRUPADO'
                        when '860101' then 'AGRUPADO'
                        when '864102' then 'AGRUPADO'
                        when '898101' then 'AGRUPADO'
                        when '862701' then 'AGRUPADO'
                        when '864103' then 'AGRUPADO'
                        when '898101' then 'AGRUPADO'
                        when '998301' then 'AGRUPADO'
                        when '862501' then 'AGRUPADO'
                        when '861401' then 'AGRUPADO'
                        when '861402' then 'AGRUPADO'
                        when '863105' then 'AGRUPADO'
                        when '863104' then 'AGRUPADO'
                        when '864201' then 'AGRUPADO'
                        when '863101' then 'AGRUPADO'
                        when '864101' then 'AGRUPADO'
                        when '863102' then 'AGRUPADO'
                        when '862703' then 'AGRUPADO'
                        when '862704' then 'AGRUPADO'
                        when '864104' then 'AGRUPADO'
                        when '890242' then 'AGRUPADO'
                        when '860102' then 'AGRUPADO'
                        when '864202' then 'AGRUPADO'
                        when '864205-A ' then 'AGRUPADO'
                        when '981403' then 'AGRUPADO'
                        when '861101' then 'AGRUPADO'
                        when '998301' then 'AGRUPADO'
                        when '998303' then 'AGRUPADO'
                        when '861402' then 'AGRUPADO'
                        when '861403' then 'AGRUPADO'
                        when '860102' then 'AGRUPADO'
                        when '864102B' then 'AGRUPADO'
                        when '863103B' then 'AGRUPADO'
                        when '864203' then 'AGRUPADO'
                        when '860101A ' then 'AGRUPADO'
                        when '061002-A' then 'AGRUPADO'
                        when '898201' then 'AGRUPADO'
                        when '890211' then 'AGRUPADO'
                        when '869500' then 'AGRUPADO'
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
Trunc(rpa.rpa_for_fechatencion) >= To_date('2022/01/01', 'yyyy/mm/dd')
AND Trunc(rpa.rpa_for_fechatencion) <= Last_day(SYSDATE) --este campo debe ser la fecha actual
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
       --AND rpa_for_numerformu IN ('2404011363')
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
Trunc(rpa.rpa_for_fechatencion) >= To_date('2022/01/01', 'yyyy/mm/dd')
AND Trunc(rpa.rpa_for_fechatencion) <= Last_day(SYSDATE) --fecha actual que se esta ejecutando
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
       --AND rpa_for_numerformu IN('2404011363')
       )