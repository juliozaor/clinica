SELECT 
	Funglbgetrutpac(rpa.pac_pac_numero) rut_pac,
    I.TAB_TIPOIDENTGLOSA tipo,
    Glbgetnompac(rpa.pac_pac_numero) nom_pac,
    rpa.CON_CON_CODIGO Cod_Convenio,
    Trim(c.con_con_descripcio) convenio,
    trim(e.CON_EMP_DESCRIPCIO) Empresa,
	Decode(rpa.RPA_FOR_TIPOPROC, 'L', 'LABORATORIO',
								'I', 'IMAGENES',
								'A', 'PATOLOGIA',
								'C', 'PROCEDIMIENTOS',
								'D', 'CONSULTA',
								'E', 'PROCEDIMIENTOS',
								'F', 'PROCEDIMIENTOS',
								'G', 'PROCEDIMIENTOS',
								'J', 'PROCEDIMIENTOS',
								'K', 'PROCEDIMIENTOS',
								'M', 'PROCEDIMIENTOS',
								'N', 'PROCEDIMIENTOS',
								'O', 'PROCEDIMIENTOS',
								'P', 'PROCEDIMIENTOS',
								'Q', 'PROCEDIMIENTOS',
								'R', 'PROCEDIMIENTOS',
								'S', 'PROCEDIMIENTOS',
								'T', 'PROCEDIMIENTOS',
								'U', 'PROCEDIMIENTOS',
								'X', 'PROCEDIMIENTOS',
								'Y', 'PROCEDIMIENTOS',
								' ', 'CONSULTA') Ambito,
	rpa.rpa_for_fechadigit,
	rpa.rpa_for_numerformu,
	rpa.rpa_for_fechatencion,
	rpa.rpa_for_etdcta,
	Funglbgetvaldetcta(rpa.rpa_for_tipoformu, rpa.rpa_for_numerformu) ValorCta,
	RPA.rpa_for_tipoformu,
	RPA.rpa_for_numerformu,
	admsalud.Fncgetnomprofusuario(rpa.rpa_for_codigrecep) Usuario,
	rpa.rpa_for_vigencia,
	CODIGOCENTROATEN
FROM   
	ADMSALUD.rpa_formulario rpa,
	ADMSALUD.con_convenio c,
	ADMSALUD.con_empresa e,
	ADMSALUD.TAB_TIPOIDENT  I,
	ADMSALUD.pac_paciente p
WHERE  
	Trunc(rpa.rpa_for_fechatencion) >= To_date('2024/01/01', 'yyyy/mm/dd')
	AND Trunc(rpa.rpa_for_fechatencion) <= Last_day(CURRENT_DATE)
	AND rpa.rpa_for_tipoformu = '02  '
	AND rpa.rpa_for_vigencia <> 'N'
	AND rpa.pac_pac_numero NOT IN( 1308, 29062, 5024, 40487,43624, 1917, 19058 )
	AND Funglbgetvaldetcta(rpa.rpa_for_tipoformu, rpa.rpa_for_numerformu) > 0
	AND rpa.rpa_for_fechatencion <> To_date('1900/01/01', 'yyyy/mm/dd')
	AND rpa.fac_fac_fechafacturacion = To_date('1900/01/01', 'yyyy/mm/dd')
	AND rpa.con_con_codigo <> 'CP      '
	AND rpa.con_con_codigo = c.con_con_codigo
	and rpa.rpa_for_urgencia <> 'S' AND rpa.rpa_for_urgencia <>'H'
	and e.CON_EMP_RUT = c.CON_EMP_RUT
	and p.PAC_PAC_NUMERO = rpa.PAC_PAC_NUMERO
	and I.TAB_TIPOIDENTCODIGO = e.TAB_TIPOIDENTCODIGO
	AND NOT EXISTS(	SELECT 	'x'
					FROM   	ADMSALUD.tabfctgrp grp
					WHERE  	grp.rpa_for_numerformu = rpa.rpa_for_numerformu
							AND grp.rpa_for_tipoformu = rpa.rpa_for_tipoformu
							AND grp.pac_pac_numero = rpa.pac_pac_numero
							AND grp.fecprc <= Last_day(To_date('2024/01/25', 'yyyy/mm/dd')) + 1
				)
	AND ( EXISTS(	SELECT 	'x'
					FROM   	ADMSALUD.ate_prestacion ate
					WHERE  	ate.ate_pre_numerpacie = rpa.pac_pac_numero
							AND ate.ate_pre_numerformu = rpa.rpa_for_numerformu
							AND ate.ate_pre_tipoformu = rpa.rpa_for_tipoformu
							AND ate.ate_pre_concepago <> 'TP')
          OR EXISTS(SELECT 	'x'
                    FROM   	ate_insumos ins
                    WHERE  	ins.ate_ins_numerpacie = rpa.pac_pac_numero
							AND ins.ate_ins_numerformu = rpa.rpa_for_numerformu
                           AND ins.ate_ins_tipoformu = rpa.rpa_for_tipoformu
                           AND ins.concepago <> 'TP') 
		) 
;