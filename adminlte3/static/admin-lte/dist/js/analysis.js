
var yearFrom = 2000;
var yearTo = 2019;
var f1 = "Total Phosphorus (mg/L)";
var f2 = "Total Nitrogen (mg/L)";
var station = '6010400102';
var data_type = 'historical';
let des1 = document.getElementById('dec1');
let des2 = document.getElementById('dec2');
let standard_type = document.getElementById('standardType');
var station;
document.getElementById('getValue').disabled = true;
var CSV = "https://github.com/DishaCoder/CSV/blob/main/MasterData_For_Web_22_July.csv";
var dataColumns = ['Station',
'Date',
'Agricultural Land 10m (ha)',
'Anthropogenci Land 10m (ha)',
'Anthropogenic Natural Land 10m (ha)',
'Natural Land 10m (ha)',
'Agricultural Land 250m (ha)',
'Anthropogenic Land 250m (ha)',
'Natural Land 250m (ha)',
'Apartment Duplex',
'Apartment Fewer Than Five Storeys',
'Apartment More Than Five Storeys',
'Agricultural Land AGGREGATE 10m (ha)',
'AGRICULTURE FACILITY 10m (ha)',
'AIRPORT Land 10m (ha)',
'Athletic Land 10m (ha)',
'Commercial Land 10m (ha)',
'Crop Fields 10m (ha)',
'Coniferous Forest 10m (ha)',
'Coniferous Swamp 10m (ha)',
'Cultural Hederow 10m (ha)',
'Cultural Meadow 10m (ha)',
'Cultural Savannah 10m (ha)',
'Cultural Thicket 10m (ha)',
'Cultural Woodland 10m (ha)',
'Deciduous Forest 10m (ha)',
'Deciduous Swamp 10m (ha)',
'Floating Leave Shallow Aquatic 10m (ha)',
'Golf Facilitty 10m (ha)',
'Residential High Density Urban 10m (ha)',
'Industrial Land 10m (ha)',
'Institutional Building 10m (ha)',
'Institutional Greenspace 10m (ha)',
'Landfill 10m (ha)',
'Meadow Marsh 10m (ha)',
'Mixed Forest 10m (ha)',
'Mixed Shallow Ayqatic 10m (ha)',
'Mixed Swamp 10m(ha)',
'Open Aquatic 10m (ha)',
'Open Fen 10m (ha)',
'Park 10m (ha)',
'Pasture 10m (ha)',
'Plantation 10m (ha)',
'Railway 10m CLOCA (ha)',
'Residential Rural 10m (ha)',
'Ski Hill 10m (ha)',
'Shallow Marsh 10m (ha)',
'Shrub Fen 10m (ha)',
'Submerged Shallow Aquatic 10m (ha)',
'Transportation Corridor 10m (ha)',
'Transportation Greenspace 10m (ha)',
'Treed Field 10m (ha)',
'Thicket Swamp 10m (ha)',
'Treed Bog 10m (ha)',
'Treed Fen 10m (ha)',
'Residential Urban 10m (ha)',
'Utility Transfer Station 10m (ha)',
'Water Feature 10m (ha)',
'Census Year',
'Chloride (mg/L)',
'Climate ID',
'Conductivity (K)',
'Clay Soil (%)',
'Other Soil (%)',
'Sand Soil (%)',
'Silt Soil (%)',
'Unknown Soil (%)',
'Saturated Soil (cm/h)',
'Dissolved Inorganic Carbon (mg/L)',
'Dissolved Organic Carbon (mg/L)',
'Dissolved Oxygen (mg/L)',
'Distance To Lake (Km)',
'Drainage Basin Area (sqkm)',
'Employed',
'Land Area (sqkm)',
'Latitude',
'Longitude',
'Cropland/Natural Vegetation Mosaics 250m (ha)',
'Cropland 250m (ha)',
'Deciduous Broadlead Forests 250m (ha)',
'Grasslands 250m (ha)',
'Mixed Forests 250m (ha)',
'Savannas 250m (ha)',
'Urban Built-up Lands 250m (ha)',
'Woody Savannas 250m (ha)',
'Max Temp (°C) -14day Mean',
'Max Temp (°C) -1day Mean',
'Max Temp (°C) -28day Mean',
'Max Temp (°C) -3day Mean',
'Max Temp (°C) -56day Mean',
'Max Temp (°C) -7day Mean',
'Max Temp (°C) 0day Mean',
'Mean Temp (°C) -14day Mean',
'Mean Temp (°C) -1day Mean',
'Mean Temp (°C) -28day Mean',
'Mean Temp (°C) -3day Mean',
'Mean Temp (°C) -56day Mean',
'Mean Temp (°C) -7day Mean',
'Mean Temp (°C) 0day Mean',
'Min Temp (°C) -14day Mean',
'Min Temp (°C) -1day Mean',
'Min Temp (°C) -28day Mean',
'Min Temp (°C) -3day Mean',
'Min Temp (°C) -56day Mean',
'Min Temp (°C) -7day Mean',
'Min Temp (°C) 0day Mean',
'Month',
'Movable dwelling',
'Nitrate (mg/L)',
'Nitrate Nitrite (mg/L)',
'Nitrite (mg/L)',
'Nitrogen Kjeldahl (mg/L)',
'Not in the labour force',
'Other single-attached house',
'Population',
'Row house',
'Semi-detached house',
'Single-detached house',
'Aggregate Extraction Land 10m (ha)',
'Agricultural Land 10m (ha).1',
'Beach 10m (ha)',
'Cemetery 10m (ha)',
'Commercial Land 10m (ha).1',
'Residential Estate 10m (ha)',
'Forest 10m (ha)',
'Golf Course 10m (ha)',
'Residential High Density 10m (ha)',
'Industrial Land 10m (ha).1',
'Institutional Land 10m (ha)',
'Lacustrine Land 10m (ha)',
'Meadow Land 10m (ha)',
'Residential Meidum Density 10m (ha)',
'Mixed Commercial Entertainment 10m (ha)',
'Railway 10m TRCA(ha)',
'Recreational/Open space Land 10m (ha)',
'Riverine 10m (ha)',
'Roads 10m (ha)',
'Rural Residnetial 10m (ha)',
'Successional Forest 10m (ha)',
'Vacant Land 10m (ha)',
'Wetland 10m (ha)',
'Total Rain (mm) -14day Total',
'Total Rain (mm) -1day Total',
'Total Rain (mm) -28day Total',
'Total Rain (mm) -3day Total',
'Total Rain (mm) -56day Total',
'Total Rain (mm) -7day Total',
'Total Rain (mm) 0day Total',
'Total private dwellings',
'Total Dissolved Solids (mg/L)',
'Total Nitrogen (mg/L)',
'Total Phosphorus (mg/L)',
'Total Solids (mg/L)',
'Total Suspended Solids (mg/L)',
'Unemployed',
'Year',
'name',
'pH',
'1,1,1,2-Tetrachloroethane(NPRI_Disposal_Eliminate)',
'1,1,1,2-Tetrachloroethane(NPRI_Disposal_Transfers)',
'1,1,2,2-Tetrachloroethane(NPRI_Disposal_Eliminate)',
'1,1,2,2-Tetrachloroethane(NPRI_Disposal_Transfers)',
'1,1,2-Trichloroethane(NPRI_Disposal_Eliminate)',
'1,1,2-Trichloroethane(NPRI_Disposal_Transfers)',
'1,1,2-Trichloroethane(NPRI_Release_Rejects)',
'1,2,4-Trimethylbenzene(NPRI_Disposal_Eliminate)',
'1,2,4-Trimethylbenzene(NPRI_Disposal_Transfers)',
'1,2,4-Trimethylbenzene(NPRI_Release_Rejects)',
'2-(2-Methoxyethoxy)ethanol(NPRI_Disposal_Transfers)',
'2-(2-Methoxyethoxy)ethanol(NPRI_Release_Rejects)',
'2-Butoxyethanol(NPRI_Disposal_Eliminate)',
'2-Butoxyethanol(NPRI_Disposal_Transfers)',
'2-Butoxyethanol(NPRI_Release_Rejects)',
'2-Methoxyethanol(NPRI_Release_Rejects)',
"3,3'-Dichlorobenzidine dihydrochloride(NPRI_Disposal_Eliminate)",
"3,3'-Dichlorobenzidine dihydrochloride(NPRI_Disposal_Transfers)",
'Acenaphthene(NPRI_Release_Rejects)',
'Acenaphthylene(NPRI_Release_Rejects)',
'Acetonitrile(NPRI_Disposal_Transfers)',
'Acetonitrile(NPRI_Release_Rejects)',
'Acrylamide(NPRI_Disposal_Eliminate)',
'Acrylamide(NPRI_Disposal_Transfers)',
'Acrylamide(NPRI_Release_Rejects)',
'Acrylic acid (and its salts)(NPRI_Disposal_Eliminate)',
'Acrylic acid (and its salts)(NPRI_Disposal_Transfers)',
'Acrylic acid (and its salts)(NPRI_Release_Rejects)',
'Acrylonitrile(NPRI_Disposal_Transfers)',
'Acrylonitrile(NPRI_Release_Rejects)',
'Aluminum (fume or dust only)(NPRI_Disposal_Eliminate)',
'Aluminum (fume or dust only)(NPRI_Disposal_Transfers)',
'Aluminum (fume or dust only)(NPRI_Release_Rejects)',
'Aluminum oxide (fibrous forms only)(NPRI_Disposal_Eliminate)',
'Aluminum oxide (fibrous forms only)(NPRI_Release_Rejects)',
'Ammonia (total)(NPRI_Disposal_Eliminate)',
'Ammonia (total)(NPRI_Disposal_Transfers)',
'Ammonia (total)(NPRI_Release_Rejects)',
'Anthracene(NPRI_Disposal_Eliminate)',
'Anthracene(NPRI_Disposal_Transfers)',
'Anthracene(NPRI_Release_Rejects)',
'Antimony (and its compounds)(NPRI_Disposal_Eliminate)',
'Antimony (and its compounds)(NPRI_Disposal_Transfers)',
'Antimony (and its compounds)(NPRI_Release_Rejects)',
'Arsenic (and its compounds)(NPRI_Disposal_Eliminate)',
'Arsenic (and its compounds)(NPRI_Disposal_Transfers)',
'Arsenic (and its compounds)(NPRI_Release_Rejects)',
'Asbestos (friable form only)(NPRI_Disposal_Eliminate)',
'Benz[a]anthracene(NPRI_Disposal_Eliminate)',
'Benz[a]anthracene(NPRI_Disposal_Transfers)',
'Benz[a]anthracene(NPRI_Release_Rejects)',
'Benzene(NPRI_Disposal_Eliminate)',
'Benzene(NPRI_Disposal_Transfers)',
'Benzene(NPRI_Release_Rejects)',
'Benzo[a]pyrene(NPRI_Disposal_Eliminate)',
'Benzo[a]pyrene(NPRI_Disposal_Transfers)',
'Benzo[a]pyrene(NPRI_Release_Rejects)',
'Benzo[b]fluoranthene(NPRI_Disposal_Eliminate)',
'Benzo[b]fluoranthene(NPRI_Disposal_Transfers)',
'Benzo[b]fluoranthene(NPRI_Release_Rejects)',
'Benzo[e]pyrene(NPRI_Disposal_Eliminate)',
'Benzo[e]pyrene(NPRI_Disposal_Transfers)',
'Benzo[e]pyrene(NPRI_Release_Rejects)',
'Benzo[ghi]perylene(NPRI_Disposal_Eliminate)',
'Benzo[ghi]perylene(NPRI_Disposal_Transfers)',
'Benzo[ghi]perylene(NPRI_Release_Rejects)',
'Benzo[j]fluoranthene(NPRI_Disposal_Eliminate)',
'Benzo[j]fluoranthene(NPRI_Disposal_Transfers)',
'Benzo[j]fluoranthene(NPRI_Release_Rejects)',
'Benzo[k]fluoranthene(NPRI_Disposal_Eliminate)',
'Benzo[k]fluoranthene(NPRI_Disposal_Transfers)',
'Benzo[k]fluoranthene(NPRI_Release_Rejects)',
'Benzyl chloride(NPRI_Release_Rejects)',
'Biphenyl(NPRI_Disposal_Eliminate)',
'Biphenyl(NPRI_Disposal_Transfers)',
'Biphenyl(NPRI_Release_Rejects)',
'Bis(2-ethylhexyl) adipate(NPRI_Disposal_Eliminate)',
'Bis(2-ethylhexyl) adipate(NPRI_Disposal_Transfers)',
'Bis(2-ethylhexyl) adipate(NPRI_Release_Rejects)',
'Bis(2-ethylhexyl) phthalate(NPRI_Disposal_Eliminate)',
'Bis(2-ethylhexyl) phthalate(NPRI_Disposal_Transfers)',
'Bis(2-ethylhexyl) phthalate(NPRI_Release_Rejects)',
'Bisphenol A(NPRI_Disposal_Eliminate)',
'Bisphenol A(NPRI_Disposal_Transfers)',
'Butyl acrylate(NPRI_Disposal_Eliminate)',
'Butyl acrylate(NPRI_Disposal_Transfers)',
'Butyl acrylate(NPRI_Release_Rejects)',
'Butyl benzyl phthalate(NPRI_Disposal_Eliminate)',
'Butyl benzyl phthalate(NPRI_Disposal_Transfers)',
'Butyl benzyl phthalate(NPRI_Release_Rejects)',
'C.I. Basic Red 1(NPRI_Release_Rejects)',
'CFC-11(NPRI_Disposal_Transfers)',
'CFC-11(NPRI_Release_Rejects)',
'CFC-12(NPRI_Disposal_Transfers)',
'CFC-12(NPRI_Release_Rejects)',
'Cadmium (and its compounds)(NPRI_Disposal_Eliminate)',
'Cadmium (and its compounds)(NPRI_Disposal_Transfers)',
'Cadmium (and its compounds)(NPRI_Release_Rejects)',
'Calcium fluoride(NPRI_Disposal_Eliminate)',
'Calcium fluoride(NPRI_Disposal_Transfers)',
'Calcium fluoride(NPRI_Release_Rejects)',
'Carbon monoxide(NPRI_Release_Rejects)',
'Chlorine(NPRI_Disposal_Transfers)',
'Chlorine(NPRI_Release_Rejects)',
'Chloroform(NPRI_Disposal_Eliminate)',
'Chromium (and its compounds)(NPRI_Disposal_Eliminate)',
'Chromium (and its compounds)(NPRI_Disposal_Transfers)',
'Chromium (and its compounds)(NPRI_Release_Rejects)',
'Chrysene(NPRI_Disposal_Eliminate)',
'Chrysene(NPRI_Disposal_Transfers)',
'Chrysene(NPRI_Release_Rejects)',
'Cobalt (and its compounds)(NPRI_Disposal_Eliminate)',
'Cobalt (and its compounds)(NPRI_Disposal_Transfers)',
'Cobalt (and its compounds)(NPRI_Release_Rejects)',
'Copper (and its compounds)(NPRI_Disposal_Eliminate)',
'Copper (and its compounds)(NPRI_Disposal_Transfers)',
'Copper (and its compounds)(NPRI_Release_Rejects)',
'Cresol (all isomers, and their salts)(NPRI_Disposal_Eliminate)',
'Cresol (all isomers, and their salts)(NPRI_Disposal_Transfers)',
'Cresol (all isomers, and their salts)(NPRI_Release_Rejects)',
'Cumene(NPRI_Disposal_Eliminate)',
'Cumene(NPRI_Disposal_Transfers)',
'Cumene(NPRI_Release_Rejects)',
'Cyanides (ionic)(NPRI_Disposal_Eliminate)',
'Cyanides (ionic)(NPRI_Release_Rejects)',
'Cyclohexane(NPRI_Disposal_Eliminate)',
'Cyclohexane(NPRI_Disposal_Transfers)',
'Cyclohexane(NPRI_Release_Rejects)',
'Decabromodiphenyl oxide(NPRI_Disposal_Eliminate)',
'Decabromodiphenyl oxide(NPRI_Disposal_Transfers)',
'Decabromodiphenyl oxide(NPRI_Release_Rejects)',
'Dibutyl phthalate(NPRI_Disposal_Eliminate)',
'Dibutyl phthalate(NPRI_Disposal_Transfers)',
'Dibutyl phthalate(NPRI_Release_Rejects)',
'Dichloromethane(NPRI_Disposal_Eliminate)',
'Dichloromethane(NPRI_Disposal_Transfers)',
'Dichloromethane(NPRI_Release_Rejects)',
'Diethanolamine (and its salts)(NPRI_Disposal_Eliminate)',
'Diethanolamine (and its salts)(NPRI_Disposal_Transfers)',
'Diethanolamine (and its salts)(NPRI_Release_Rejects)',
'Dimethyl phthalate(NPRI_Release_Rejects)',
'Dioxins and furans - total(NPRI_Disposal_Eliminate)',
'Dioxins and furans - total(NPRI_Disposal_Transfers)',
'Dioxins and furans - total(NPRI_Release_Rejects)',
'Diphenylamine(NPRI_Disposal_Eliminate)',
'Diphenylamine(NPRI_Release_Rejects)',
'Ethyl acrylate(NPRI_Disposal_Transfers)',
'Ethyl acrylate(NPRI_Release_Rejects)',
'Ethylbenzene(NPRI_Disposal_Eliminate)',
'Ethylbenzene(NPRI_Disposal_Transfers)',
'Ethylbenzene(NPRI_Release_Rejects)',
'Ethylene glycol(NPRI_Disposal_Eliminate)',
'Ethylene glycol(NPRI_Disposal_Transfers)',
'Ethylene glycol(NPRI_Release_Rejects)',
'Fluoranthene(NPRI_Disposal_Eliminate)',
'Fluoranthene(NPRI_Disposal_Transfers)',
'Fluoranthene(NPRI_Release_Rejects)',
'Fluorene(NPRI_Release_Rejects)',
'Formaldehyde(NPRI_Disposal_Eliminate)',
'Formaldehyde(NPRI_Disposal_Transfers)',
'Formaldehyde(NPRI_Release_Rejects)',
'Formic acid(NPRI_Disposal_Eliminate)',
'Formic acid(NPRI_Disposal_Transfers)',
'Formic acid(NPRI_Release_Rejects)',
'HCFC-141b(NPRI_Disposal_Eliminate)',
'HCFC-141b(NPRI_Release_Rejects)',
'HCFC-142b(NPRI_Disposal_Eliminate)',
'HCFC-142b(NPRI_Release_Rejects)',
'HCFC-22(NPRI_Disposal_Eliminate)',
'HCFC-22(NPRI_Disposal_Transfers)',
'HCFC-22(NPRI_Release_Rejects)',
'Hexachlorobenzene(NPRI_Release_Rejects)',
'Hexavalent chromium (and its compounds)(NPRI_Disposal_Eliminate)',
'Hexavalent chromium (and its compounds)(NPRI_Disposal_Transfers)',
'Hexavalent chromium (and its compounds)(NPRI_Release_Rejects)',
'Hydrazine (and its salts)(NPRI_Disposal_Transfers)',
'Hydrazine (and its salts)(NPRI_Release_Rejects)',
'Hydrochloric acid(NPRI_Disposal_Eliminate)',
'Hydrochloric acid(NPRI_Disposal_Transfers)',
'Hydrochloric acid(NPRI_Release_Rejects)',
'Hydrogen fluoride(NPRI_Disposal_Transfers)',
'Hydrogen fluoride(NPRI_Release_Rejects)',
'Indeno[1,2,3-cd]pyrene(NPRI_Disposal_Eliminate)',
'Indeno[1,2,3-cd]pyrene(NPRI_Disposal_Transfers)',
'Indeno[1,2,3-cd]pyrene(NPRI_Release_Rejects)',
'Isopropyl alcohol(NPRI_Disposal_Eliminate)',
'Isopropyl alcohol(NPRI_Disposal_Transfers)',
'Isopropyl alcohol(NPRI_Release_Rejects)',
'Lead (and its compounds)(NPRI_Disposal_Eliminate)',
'Lead (and its compounds)(NPRI_Disposal_Transfers)',
'Lead (and its compounds)(NPRI_Release_Rejects)',
'Manganese (and its compounds)(NPRI_Disposal_Eliminate)',
'Manganese (and its compounds)(NPRI_Disposal_Transfers)',
'Manganese (and its compounds)(NPRI_Release_Rejects)',
'Mercury (and its compounds)(NPRI_Disposal_Eliminate)',
'Mercury (and its compounds)(NPRI_Disposal_Transfers)',
'Mercury (and its compounds)(NPRI_Release_Rejects)',
'Methanol(NPRI_Disposal_Eliminate)',
'Methanol(NPRI_Disposal_Transfers)',
'Methanol(NPRI_Release_Rejects)',
'Methyl acrylate(NPRI_Disposal_Eliminate)',
'Methyl acrylate(NPRI_Disposal_Transfers)',
'Methyl acrylate(NPRI_Release_Rejects)',
'Methyl ethyl ketone(NPRI_Disposal_Eliminate)',
'Methyl ethyl ketone(NPRI_Disposal_Transfers)',
'Methyl ethyl ketone(NPRI_Release_Rejects)',
'Methyl isobutyl ketone(NPRI_Disposal_Eliminate)',
'Methyl isobutyl ketone(NPRI_Disposal_Transfers)',
'Methyl isobutyl ketone(NPRI_Release_Rejects)',
'Methyl methacrylate(NPRI_Disposal_Eliminate)',
'Methyl methacrylate(NPRI_Disposal_Transfers)',
'Methyl methacrylate(NPRI_Release_Rejects)',
'Methyl tert-butyl ether(NPRI_Disposal_Eliminate)',
'Methyl tert-butyl ether(NPRI_Disposal_Transfers)',
'Methyl tert-butyl ether(NPRI_Release_Rejects)',
'Methylenebis(phenylisocyanate)(NPRI_Disposal_Eliminate)',
'Methylenebis(phenylisocyanate)(NPRI_Disposal_Transfers)',
'Methylenebis(phenylisocyanate)(NPRI_Release_Rejects)',
'N-Methyl-2-pyrrolidone(NPRI_Disposal_Eliminate)',
'N-Methyl-2-pyrrolidone(NPRI_Disposal_Transfers)',
'N-Methyl-2-pyrrolidone(NPRI_Release_Rejects)',
'NPRI_ID',
'Naphthalene(NPRI_Disposal_Eliminate)',
'Naphthalene(NPRI_Disposal_Transfers)',
'Naphthalene(NPRI_Release_Rejects)',
'Nickel (and its compounds)(NPRI_Disposal_Eliminate)',
'Nickel (and its compounds)(NPRI_Disposal_Transfers)',
'Nickel (and its compounds)(NPRI_Release_Rejects)',
'Nitrate ion in solution at pH >= 6.0(NPRI_Disposal_Eliminate)',
'Nitrate ion in solution at pH >= 6.0(NPRI_Disposal_Transfers)',
'Nitrate ion in solution at pH >= 6.0(NPRI_Release_Rejects)',
'Nitric acid(NPRI_Disposal_Eliminate)',
'Nitric acid(NPRI_Disposal_Transfers)',
'Nitric acid(NPRI_Release_Rejects)',
'Nitrogen oxides (expressed as nitrogen dioxide)(NPRI_Release_Rejects)',
'Nonylphenol and its ethoxylates(NPRI_Disposal_Eliminate)',
'Nonylphenol and its ethoxylates(NPRI_Disposal_Transfers)',
'Nonylphenol and its ethoxylates(NPRI_Release_Rejects)',
'Nonylphenol polyethylene glycol ether(NPRI_Disposal_Eliminate)',
'Nonylphenol polyethylene glycol ether(NPRI_Disposal_Transfers)',
'Nonylphenol polyethylene glycol ether(NPRI_Release_Rejects)',
'Octylphenol and its ethoxylates(NPRI_Disposal_Transfers)',
'PM10 - Particulate Matter <= 10 Micrometers(NPRI_Release_Rejects)',
'PM2.5 - Particulate Matter <= 2.5 Micrometers(NPRI_Release_Rejects)',
'Perylene(NPRI_Disposal_Eliminate)',
'Perylene(NPRI_Disposal_Transfers)',
'Perylene(NPRI_Release_Rejects)',
'Phenanthrene(NPRI_Disposal_Eliminate)',
'Phenanthrene(NPRI_Disposal_Transfers)',
'Phenanthrene(NPRI_Release_Rejects)',
'Phenol (and its salts)(NPRI_Disposal_Eliminate)',
'Phenol (and its salts)(NPRI_Disposal_Transfers)',
'Phenol (and its salts)(NPRI_Release_Rejects)',
'Phosphorus (total)(NPRI_Disposal_Eliminate)',
'Phosphorus (total)(NPRI_Disposal_Transfers)',
'Phosphorus (total)(NPRI_Release_Rejects)',
'Phosphorus (yellow or white only)(NPRI_Disposal_Eliminate)',
'Phosphorus (yellow or white only)(NPRI_Disposal_Transfers)',
'Phosphorus (yellow or white only)(NPRI_Release_Rejects)',
'Phthalic anhydride(NPRI_Release_Rejects)',
'Polymeric diphenylmethane diisocyanate(NPRI_Disposal_Eliminate)',
'Polymeric diphenylmethane diisocyanate(NPRI_Disposal_Transfers)',
'Polymeric diphenylmethane diisocyanate(NPRI_Release_Rejects)',
'Pyrene(NPRI_Disposal_Eliminate)',
'Pyrene(NPRI_Disposal_Transfers)',
'Pyrene(NPRI_Release_Rejects)',
'Selenium (and its compounds)(NPRI_Disposal_Eliminate)',
'Selenium (and its compounds)(NPRI_Disposal_Transfers)',
'Selenium (and its compounds)(NPRI_Release_Rejects)',
'Silver (and its compounds)(NPRI_Disposal_Eliminate)',
'Silver (and its compounds)(NPRI_Disposal_Transfers)',
'Silver (and its compounds)(NPRI_Release_Rejects)',
'Sodium fluoride(NPRI_Disposal_Eliminate)',
'Sodium fluoride(NPRI_Disposal_Transfers)',
'Sodium fluoride(NPRI_Release_Rejects)',
'Sodium nitrite(NPRI_Disposal_Eliminate)',
'Sodium nitrite(NPRI_Disposal_Transfers)',
'Sodium nitrite(NPRI_Release_Rejects)',
'Styrene(NPRI_Disposal_Eliminate)',
'Styrene(NPRI_Disposal_Transfers)',
'Styrene(NPRI_Release_Rejects)',
'Sulphur dioxide(NPRI_Release_Rejects)',
'Sulphuric acid(NPRI_Disposal_Eliminate)',
'Sulphuric acid(NPRI_Disposal_Transfers)',
'Sulphuric acid(NPRI_Release_Rejects)',
'Tetrachloroethylene(NPRI_Disposal_Eliminate)',
'Tetrachloroethylene(NPRI_Disposal_Transfers)',
'Tetrachloroethylene(NPRI_Release_Rejects)',
'Toluene(NPRI_Disposal_Eliminate)',
'Toluene(NPRI_Disposal_Transfers)',
'Toluene(NPRI_Release_Rejects)',
'Toluene-2,4-diisocyanate(NPRI_Disposal_Eliminate)',
'Toluene-2,4-diisocyanate(NPRI_Disposal_Transfers)',
'Toluene-2,6-diisocyanate(NPRI_Disposal_Eliminate)',
'Toluenediisocyanate (mixed isomers)(NPRI_Disposal_Eliminate)',
'Toluenediisocyanate (mixed isomers)(NPRI_Disposal_Transfers)',
'Toluenediisocyanate (mixed isomers)(NPRI_Release_Rejects)',
'Total particulate matter(NPRI_Release_Rejects)',
'Trichloroethylene(NPRI_Disposal_Eliminate)',
'Trichloroethylene(NPRI_Disposal_Transfers)',
'Trichloroethylene(NPRI_Release_Rejects)',
'Vanadium (except when in an alloy) and its compounds(NPRI_Disposal_Eliminate)',
'Vanadium (except when in an alloy) and its compounds(NPRI_Disposal_Transfers)',
'Vanadium (except when in an alloy) and its compounds(NPRI_Release_Rejects)',
'Vinyl acetate(NPRI_Disposal_Eliminate)',
'Vinyl acetate(NPRI_Disposal_Transfers)',
'Vinyl acetate(NPRI_Release_Rejects)',
'Volatile Organic Compounds (VOCs)(NPRI_Release_Rejects)',
'Xylene (all isomers)(NPRI_Disposal_Eliminate)',
'Xylene (all isomers)(NPRI_Disposal_Transfers)',
'Xylene (all isomers)(NPRI_Release_Rejects)',
'Zinc (and its compounds)(NPRI_Disposal_Eliminate)',
'Zinc (and its compounds)(NPRI_Disposal_Transfers)',
'Zinc (and its compounds)(NPRI_Release_Rejects)',
'i-Butyl alcohol(NPRI_Disposal_Eliminate)',
'i-Butyl alcohol(NPRI_Disposal_Transfers)',
'i-Butyl alcohol(NPRI_Release_Rejects)',
'n-Butyl alcohol(NPRI_Disposal_Eliminate)',
'n-Butyl alcohol(NPRI_Disposal_Transfers)',
'n-Butyl alcohol(NPRI_Release_Rejects)',
'n-Hexane(NPRI_Disposal_Eliminate)',
'n-Hexane(NPRI_Disposal_Transfers)',
'n-Hexane(NPRI_Release_Rejects)',
'o-Dichlorobenzene(NPRI_Disposal_Eliminate)',
'o-Dichlorobenzene(NPRI_Disposal_Transfers)',
"p,p'-Methylenedianiline(NPRI_Disposal_Transfers)",
'p-Dichlorobenzene(NPRI_Disposal_Eliminate)',
'p-Dichlorobenzene(NPRI_Disposal_Transfers)',
'tert-Butyl alcohol(NPRI_Release_Rejects)',
'PopulationNew',
'PopulationNAFilled'];

function checkIfFilterButtonShouldenable() {
    var yearfromfrop = $("#yearFrom").val();
    var yeartooption = $("#yearTo").val();
    var standardoption = $("#standardType").val();
    var stationidfill = $("#station").val();
    var xaxisfill = $("#f1").val();
    var yaxisfill = $("#f2").val();

    if (yearfromfrop !== "" && yeartooption !== "" && standardoption !== "" && stationidfill !== "" && xaxisfill !== "" && yaxisfill !== "") {
        $("#getValue").prop("disabled",false);
    }
}

let standardType = ["ODWQS", "WHO"];

function standardDropdownBox() {
    var selectboxreturn = "<option value='' disabled selected>Select standard</option>";
    $(standardType).each((index, element) => {
        console.log(`current index : ${index} element : ${element}`);
        selectboxreturn += "<option value='" + element + "'>" + element + "</option>";
    });
    return selectboxreturn;
}

function yearFromDropDown() {
    let currentYear = new Date().getFullYear();
    let earliestYear = 2000;
    var selectboxreturn = "<option value='' selected disabled>Select from year</option>";
    while (currentYear >= earliestYear) {
        selectboxreturn += "<option value='" + currentYear + "'>" + currentYear + "</option>";
        currentYear -= 1;
    }
    return selectboxreturn;
}

// "From" year dropdown menu

$("#yearFrom").change(function () {
    console.log("yearFrom === ", $(this).val());
    globalThis.yearFrom = $(this).val();
    checkIfFilterButtonShouldenable();
});

// "To" year dropdown menu

function yearToDropDown() {
    let currentYear = 2020;
    let earliestYear = 2000;
    var selectboxreturn = "<option value='' selected disabled>Select to year</option>";
    while (currentYear >= earliestYear) {
        selectboxreturn += "<option value='" + currentYear + "'>" + currentYear + "</option>";
        currentYear -= 1;
    }
    return selectboxreturn;
}
$("#yearTo").change(function () {
    console.log("yearTo === ", $(this).val());
    globalThis.yearTo = $(this).val();
    checkIfFilterButtonShouldenable()
});

// Station selection
function stationIdSelectbox() {
    var selectboxreturn = "<option value='all' selected>All</option>";
    $(stations).each((index, element) => {
        // console.log(`current index : ${index} element : ${element}`)
        selectboxreturn += "<option value='" + element + "'>" + element + "</option>";
    });
    return selectboxreturn;
}
$("#station").change(function () {
    console.log("Station === ", $(this).val());
    globalThis.station = $(this).val();
    checkIfFilterButtonShouldenable()
});
// feature on X
function f1Selectbox() {
    var selectboxreturn = "<option value='' selected>Select Feature 1</option>";
    console.log("dataColumns in f1: ",dataColumns);
    $(dataColumns).each((index, element) => {
        // console.log(`current index : ${index} element : ${element}`)
        selectboxreturn += "<option value='" + element + "'>" + element + "</option>";
    });
    return selectboxreturn;
}


$("#f1").change(function () {
    console.log("F1 === ", $(this).val());
    globalThis.f1 = $(this).val();
    checkIfFilterButtonShouldenable()
});
// feature on Y
function f2Selectbox() {
    var selectboxreturn = "<option value='' selected>Select Feature 2</option>";
    $(dataColumns).each((index, element) => {
        // console.log(`current index : ${index} element : ${element}`)
        selectboxreturn += "<option value='" + element + "'>" + element + "</option>";
    });
    return selectboxreturn;
}
$("#f2").change(function () {
    console.log("F2 === ", $(this).val());
    globalThis.f2 = $(this).val();
    checkIfFilterButtonShouldenable()
});
// const CSV = fetch("./static/admin-lte/dist/js/test.csv");
// const CSV = "D:\Lambton AIMT\Watershed Management system\django-adminlte3-master\django-adminlte3-master\data\data\df_top_10.csv";
// const CSV = "D:/Lambton AIMT/Watershed Management system/django-adminlte3-master/django-adminlte3-master/data/data/df_top_10.csv";
// const CSV = "https://raw.githubusercontent.com/chris3edwards3/exampledata/master/plotlyJS/line.csv";

// const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/Copy%20of%20merged_dataset_20210401.csv";
// const CSV = "adminlte3/static/admin-lte/dist/js/predicted_phosphorous.csv";


// setting options to feature dropdown
function selectFeature1() {
    let i = 0;
    // $('#f1').empty();
    // getData();
    // async function getData(){
    //     features_in_usecsv = [];
    //     const response = await fetch("static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv");
    //     const data = await response.text();
    //     const table = data.split('\n');
    //     column_names = table[0];
    //     column_names = column_names.split(',');
    //     for(let i=0; i<column_names.length; i++){
    //         features_in_usecsv[i] = column_names[i].trimEnd(); 
    //     }
    //     dataColumns = features_in_usecsv;
    //     while (i < dataColumns.length) {
    //         let dateOption = document.createElement('option');
    //         dateOption.text = dataColumns[i];
    //         dateOption.value = dataColumns[i];
    //         f1.add(dateOption);
    //         i = i + 1;
    //     }
    //     i = 0;
    //     console.log("Feature", f1);
    // }
    dataColumns = ['Year', 'Month', 'Nitrogen_Kjeldahl',
        'TotalSuspendedSolids', 'Nitrate', 'Conductivity', 'DissolvedOxygen',
        'pH', 'TotalNitrogen', 'Nitrite', 'TotalPhosphorus', 'Chloride',
        '10mLandCover_AgriculturalExtraction', '10mLandCover_Anthropogenic',
        '10mLandCover_AnthropogenicNatural', '10mLandCover_Natural', 'Latitude',
        'Longitude', '250mLandCover_Agricultural',
        '250mLandCover_Anthropogenic', '250mLandCover_Natural',
        'Total Rain (mm) 0day Total', 'Total Rain (mm) -7day Total',
        'Total Rain (mm) -56day Total', 'Total Rain (mm) -3day Total',
        'Total Rain (mm) -28day Total', 'Total Rain (mm) -1day Total',
        'Total Rain (mm) -14day Total'];
    while (i < dataColumns.length) {
        let dateOption = document.createElement('option');
        dateOption.text = dataColumns[i];
        dateOption.value = dataColumns[i];
        f1.add(dateOption);
        i = i + 1;
    }
    i = 0;
    console.log("Feature", f1);
}
//function filterGraphType(){
//    graphsType = ["scatter", "bar"];
//    let i = 0;
//    while(i < graphsType.length){
//        let op = document.createElement('option');
//        op.text = graphsType[i];
//        op.value = graphsType[i];
//        graphs_type.add(op);
//        i = i+1;
//    }
//}

// check if year is present in custom data
function historicaldata() {
    console.log("Historical Data selected");
    if (document.getElementById('historicaldata').checked){
        globalThis.data_type = "historical";
         globalThis.CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/WMS_dataset.csv";
         document.getElementById('getValue').disabled = false;
    }
}
function customdata() {
    console.log("Custom Data selected");
    if (document.getElementById('customdata').checked) {
        // const CSV = "static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv";
        globalThis.data_type = "custom";
        getData();
    }
}
async function getData() {
    console.log("in get data");
    let features_in_usecsv = [];
    const response = await fetch("static/admin-lte/dist/js/data/recently_predicted.csv");
    const data = await response.text();
    const table = data.split('\n');
    column_names = table[0];
    column_names = column_names.split(',');
    for (let i = 0; i < column_names.length; i++) {
        features_in_usecsv[i] = column_names[i].trimEnd();
    }
    console.log("custom data columns: ", features_in_usecsv);
    if (features_in_usecsv.indexOf("Year") == -1) {
        alert("Year is not present in uploaded CSV. Try uploading again with 'Year' as a column.");
        //location.reload();
    }
    else {
        console.log("in else part....");
        globalThis.CSV = "static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv";
        document.getElementById('getValue').disabled = false;
        globalThis.dataColumns = features_in_usecsv;
        var f1selectbox = f1Selectbox();
        $("#f1").html(f1selectbox);
        var f2selectbox = f2Selectbox();
        $("#f2").html(f2selectbox);
    }

}
// fetching values from CSV file
function plotFromCSV() {
    //const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/df_top_10.csv";
    const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/WMS_dataset.csv";
    // const CSV = "static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv";
    console.log("csv selected: ", CSV);

    $.ajax({
        type: 'get',
        url: '/filterDataForAnalysisPage',
        data: {'yearFrom': yearFrom, 'yearTo': yearTo, "feature1":f1, 'feature2':f2, 'station':station, 'data_type':data_type},
        // contentType: false,
        // processData: false,
        // headers: { "X-CSRFToken": csrftoken },

        success: function (data) {
          console.log(data.graph1x);
          console.log(data.graph1y);
          console.log(data.graph2x);
          console.log(data.graph2y);
          console.log(data.error);
          var trace1 = {
            x: data.graph1x,
            y: data.graph1y,
            type: 'scatter'
          };
          var trace2 = {
            x: data.graph2x,
            y: data.graph2y,
            type: 'scatter'
          };
          var layout1 = {
            title: (f1).concat(" "),
            yaxis: {
                showline: true,
                zeroline: true,
                zerolinewidth: 2,
                autotick: true,
                // autorange: true,
                title: f1,
            },
            xaxis: {
                showline: true,
                title: "Years",
                tickmode: 'linear',
                zeroline: true,
                zerolinewidth: 2,
            },
          };
            var layout2 = {
                title: (f2).concat(" "),
                yaxis: {
                    showline: true,
                    zeroline: true,
                    zerolinewidth: 2,
                    autotick: true,
                    // autorange: true,
                    title: f2,
                },
                xaxis: {
                    showline: true,
                    title: "Years",
                    tickmode: 'linear',
                    zeroline: true,
                    zerolinewidth: 2,
                },
            };
          var g1 = [trace1];
          var g2 = [trace2];
          Plotly.newPlot('graph1', g1, layout1); 
          Plotly.newPlot('graph2', g2, layout2);
          document.getElementById('des1').innerHTML = data.description1;
          document.getElementById('des2').innerHTML = data.description2;
        },
        error: function (error) {
            console.log("Error" + JSON.stringify(error));
        }
     });

    d3.csv(CSV, function (rows) {
        console.log(rows);
        console.log("Data Columns = ", rows.columns);
        processData(rows);
    });
}

// filtering data according to user input
function filterRows(row) {
    let feature1 = [];
    let feature2 = [];
    let years = [];
    console.log("year from:::", yearFrom);
    console.log("From filter to:", yearTo);
    console.log("f1 ::", f1);
    console.log("f2 ::", f2);
    console.log("station ::", station);
    console.log("row: ", row);
    document.getElementById("showfilteroption").innerHTML = "Showing results for year from " + yearFrom + " to " + yearTo + ". " + f1 + " on X and " + f2 + " on Y for station " + station + ".";

    let i = 0;
    let j = 0;
    while (i < row.length) {
        if (row[i]["Year"] > yearFrom && row[i]["Year"] < yearTo && row[i]["STATION"] == station) {
            feature1[j] = row[i][f1];
            feature2[j] = row[i][f2];
            years[j] = row[i]["Year"];

            j += 1;

        }
        i += 1;
    }
    console.log(feature1[2])
    return [years, feature1, feature2];
}


function processData(allRows) {
    console.log(allRows);
    let x = [];
    let y1 = [];
    let y2 = [];
    let row;

    //Filter years
    filteredData = filterRows(allRows);
    console.log("data length = ", filteredData.length);
    console.log("filterdata.years = ", filteredData[0]);
    years = filteredData[0];
    feature1 = filteredData[1];
    feature2 = filteredData[2];
    console.log("years===", years.length);

    let i = 0;
    while (i < allRows.length) {
        y = years[i];
        p = feature1[i];
        n = feature2[i];
        x.push(y);   //(row["Year"][i]>yearTo && row["Year"][i]<yearFrom) ? row["Year"] : null);               //(row["Year"]); 
        y1.push(p);
        y2.push(n);
        i += 1;
    }

    console.log("X", x);
    console.log("Y1", y1);

    if (f1 == "TotalPhosphorus") {
        makePlotlyP(x, y1);
    }
    else if (f1 == "pH") {
        makePlotlyPH(x, y1);
    }
    else if (f1 == "Nitrogen_Kjeldahl") {
        makePlotlyNK(x, y1);
    }
    else if (f1 == "TotalNitrogen") {
        makePlotlyN(x, y1);
    }
    else {
        makePlotlyxy1(x, y1);
    }
    makePlotlyxy2(x, y2);

    makePlotlyy1y2(y1, y2);

}

note = "\n NOTE: Ontario Drinking Water Quality Standard(ODWQS) and World Health Organization(WHO) standards have been followed.";
// For nitrogen
function makePlotlyN(x, y1) {
    console.log("Min max = ", Math.min.apply(Math, y1), Math.max.apply(Math, y1));
    // console.log("graph type = ", graphs_type.value);
    // if (graphs_type.value = null){
    //     graph =  "markers";
    // }
    // else {
    //     graph = graphs_type.value;
    // }
    let traces = [
        {
            x: x,
            y: y1,
            name: "Nitrogen",
            mode: "markers",
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1).concat(" "),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1,
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },

        shapes: [
            //Line Horizontal
            {
                type: 'line',
                x0: yearFrom,
                y0: 10,
                x1: yearTo,
                y1: 10,
                text: ["According to WHO & ODWQS"],
                line: {
                    color: 'rgb(220,20,60)',
                    width: 2,
                    //dash: 'dashdot'
                }

            },
        ]


    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
    description = "The graph shows Total Nitrogen amount(on Y) recorded in mentioned year(on X). The red horizontal line indicates the threshold value for Nitrogen in drinking water of Lake Ontario is 10 mg/L.<br>The maximum acceptable concentration (MAC) for nitrate in drinking water is 45 mg/L. This is equivalent to 10 mg/L measured as nitrate-nitrogen. The MAC for nitrite in drinking water is 3 mg/L. This is equivalent to 1 mg/L measured as nitrite-nitrogen." + note;
    document.getElementById('des1').innerHTML = description;

}
// pH
function makePlotlyPH(x, y1) {
    console.log("Min max = ", Math.min.apply(Math, y1), Math.max.apply(Math, y1));
    let traces = [
        {
            x: x,
            y: y1,
            name: "PH",
            mode: "markers",
            // type:'bar',
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1).concat(" "),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1,
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },
        //Line Horizontal

        shapes: [
            //Line Horizontal
            {
                type: 'line',
                x0: yearFrom,
                y0: 6.5,
                x1: yearTo,
                y1: 6.5,
                text: ["According to WHO & ODWQS"],
                line: {
                    color: 'rgb(220,20,60)',
                    width: 2,
                    //dash: 'dashdot'
                }

            },
            {
                type: 'line',
                x0: yearFrom,
                y0: 8.5,
                x1: yearTo,
                y1: 8.5,
                text: ["According to WHO & ODWQS"],
                line: {
                    color: 'rgb(220,20,60)',
                    width: 2,
                    //dash: 'dashdot'
                }

            },
        ]


    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
    description = "The graph displays the pH amount noted in the selected years. pH level in the drinking water should be in the range of 6.5 to 8.5 as indicated in the graph." + note;
    document.getElementById('des1').innerHTML = description;
}
// nitrogen k
function makePlotlyNK(x, y1) {
    console.log("Min max = ", Math.min.apply(Math, y1), Math.max.apply(Math, y1));
    let traces = [
        {
            x: x,
            y: y1,
            name: "Nitrogen Kjeldahl",
            mode: "markers",
            // type:'bar',
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1).concat(" "),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1,
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },
        //Line Horizontal

        //  shapes: [
        // //Line Horizontal
        //     {
        //       type: 'line',
        //       x0: yearFrom,
        //       y0: 6.5,
        //       x1: yearTo,
        //       y1: 6.5,
        //       line: {
        //         color: 'rgb(220,20,60)',
        //         width: 1,
        //         //dash: 'dashdot'
        //       }

        //  ]


    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
    description = "Total Kjeldahl Nitrogen (TKN) is the sum of organic nitrogen, ammonia, and ammonium in a water body. High TKN concentrations can indicate sewage and manure discharges are present in the water body." + note;
    document.getElementById('des1').innerHTML = description;

}
function makePlotlyP(x, y1) {
    console.log("Min max = ", Math.min.apply(Math, y1), Math.max.apply(Math, y1));
    let traces = [
        {
            x: x,
            y: y1,
            name: "TotalPhosphorus",
            mode: "markers",
            // type:'bar',
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1).concat(" "),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1,
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },

        shapes: [
            //Line Horizontal
            {
                type: 'line',
                x0: yearFrom,
                y0: 0.5,
                x1: yearTo,
                y1: 0.5,
                line: {
                    color: 'rgb(220,20,60)',
                    width: 1,
                    //dash: 'dashdot'
                }

            },
        ]


    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
    description = "The graph shows the amount of Phosphorus level in the water in selected years. The Phosphorus more than 0.5 mg/L is considered as dengerous for the health." + note;
    document.getElementById('des1').innerHTML = description;
}
function makePlotlyxy1(x, y1) {
    let traces = [
        {
            x: x,
            y: y1,
            name: "",
            mode: "markers",
            // type: 'bar',
        },
    ];

    let layout = {
        title: (f1).concat(" "),
        yaxis: {
            title: f1,
            width: 2,

        },
        xaxis: {
            title: "Year",
            width: 2,
        },
    };
    shapes: [
        //Line Horizontal
        {
            type: 'line',
            x0: yearFrom,
            y0: 0.5,
            x1: yearTo,
            y1: 0.5,
            line: {
                color: 'rgb(220,20,60)',
                width: 2,
                //dash: 'dashdot'
            }

        },
    ]


    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
    description = "The graph is plotted for " + f1 + " (on X) and " + f2 + " (on Y). Hovering on the graph generates popup showing the values for two selected feature." + note;
    document.getElementById('des1').innerHTML = description;

}
// Fixed second graph
function makePlotlyxy2(x, y2) {
    let traces = [
        {
            x: x,
            y: y2,
            name: "",
            mode: "markers",
            // type: 'bar',
        },
    ];

    let layout = {
        title: (f2).concat(" "),
        yaxis: {
            title: f2,
            width: 2,

        },
        xaxis: {
            title: "Year",
            width: 2,
        },
    };
    shapes: [
        //Line Horizontal
        {
            type: 'line',
            x0: yearFrom,
            y0: 0.5,
            x1: yearTo,
            y1: 0.5,
            line: {
                color: 'rgb(220,20,60)',
                width: 2,
                //dash: 'dashdot'
            }

        },
    ]


    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot2", traces, layout, config);
    description = "The graph is plotted for " + f1 + " (on X) and " + f2 + " (on Y). Hovering on the graph generates popup showing the values for two selected feature." + note;
    document.getElementById('des2').innerHTML = description;

}
// Fixed second graph
function makePlotlyy1y2(y1, y2) {
    let traces = [
        {
            x: y1,
            y: y2,
            name: f1 + " vs " + f2,
            //mode: "markers",
            type: 'bar',
        },
    ];

    let layout = {
        title: "",
        yaxis: {
            title: f2,
            width: 2,

        },
        xaxis: {
            title: f1,
            width: 2,
        },
    };
    shapes: [
        //Line Horizontal
        {
            type: 'line',
            x0: yearFrom,
            y0: 0.5,
            x1: yearTo,
            y1: 0.5,
            line: {
                color: 'rgb(220,20,60)',
                width: 2,
                //dash: 'dashdot'
            }

        },
    ]


    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plotInRow", traces, layout, config);
    description = "The graph is plotted for " + f1 + " (on X) and " + f2 + " (on Y). Hovering on the graph generates popup showing the values for two selected feature." + note;
    document.getElementById('des3').innerHTML = description;

}

function showMap() {
    // // calling python fucntion
    // $.ajax({
    //     type: "POST",
    //     url: "/advanced",
    //     data: {}
    //   });
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGlzaGFjb2RlciIsImEiOiJja3dkcm80b2MwbTNiMnBvcDVicnRpMXYyIn0.UTc2vYCIeJVk4-GPCxHAkQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/dishacoder/ckxxoccar7lh714qezto6o17y',
        center: [-78.858447, 43.904752],
        zoom: 9
    });

    map.on('click', (event) => {
        const features = map.queryRenderedFeatures(event.point, {
            layers: ['df-top-10']
        });
        if (!features.length) {
            return;
        }
        const feature = features[0];
        const val1 = String(f1); //feature 1
        const val2 = String(f2); //feature 2
        console.log("val1=" + val1);
        if (val1 == "TotalPhosphorus" || val2 == "TotalPhosphorus")
            var html_el = `<h6>Year: ${feature.properties.Year}</h6>
                <p>${val1}: ${feature.properties[val1]}<br>
                </p>
                <p>${val2}: ${feature.properties[val2]}<br>
                </p>`;
        else
            var html_el = `<h6>Year: ${feature.propert.csvies.Year}</h6>
                <p>Phosphorus: ${feature.properties.TotalPhosphorus}<br>
                Nitrogen: ${feature.properties.TotalNitrogen}<br>
                Nitrogen_Kjeldahl: ${feature.properties.Nitrogen_Kjeldahl}<br>
                pH: ${feature.properties.pH}</p>`;
        var f = Object.keys(feature.properties)
        const popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(
                html_el
            )
            .addTo(map);
    });
}
// plotFromCSV();
function filter_station_on_map() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGlzaGFjb2RlciIsImEiOiJja3dkcm80b2MwbTNiMnBvcDVicnRpMXYyIn0.UTc2vYCIeJVk4-GPCxHAkQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/dishacoder/ckxxoccar7lh714qezto6o17y',
        center: [-78.858447, 43.904752],
        zoom: 9
    });

    map.on('click', (event) => {
        const features = map.queryRenderedFeatures(event.point, {
            layers: ['df-top-10']
        });
        if (!features.length) {
            return;
        }
        const feature = features[0];
        const val1 = String(f1); //feature 1
        const val2 = String(f2); //feature 2
        console.log("val1=" + val1);
        if (val1 == "TotalPhosphorus" || val2 == "TotalPhosphorus")
            var html_el = `<h6>Year: ${feature.properties.Year}</h6>
                <p>${val1}: ${feature.properties[val1]}<br>
                </p>
                <p>${val2}: ${feature.properties[val2]}<br>
                </p>`;
        else
            var html_el = `<h6>Year: ${feature.properties.Year}</h6>
                <p>Phosphorus: ${feature.properties.TotalPhosphorus}<br>
                Nitrogen: ${feature.properties.TotalNitrogen}<br>
                Nitrogen_Kjeldahl: ${feature.properties.Nitrogen_Kjeldahl}<br>
                pH: ${feature.properties.pH}</p>`;
        var f = Object.keys(feature.properties)
        const popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(
                html_el
            )
            .addTo(map);
    });

}

// folium map js

function launchMap() {
    const o2 = document.getElementsByName("o2").value;
    const depth = document.getElementsByName("depth").value;
    const n = document.getElementsByName("n").value;
    const nk = document.getElementsByName("nk").value;
    const tss = document.getElementsByName("tss").value;
    const p = document.getElementsByName("p").value;
    const feature_selected = [o2, depth, n, nk, tss, p];
    console.log(feature_selected);
}


function plot_np() {
    const CSV = "static/admin-lte/dist/js/data/high_n.csv";
    d3.csv(CSV, function (rows) {
        console.log(rows);
        console.log("Data Columns = ", rows.columns);
        processDataForNP(rows);

    });
}

function processDataForNP(rows) {
    console.log("process data:", rows);
    let i = 0;
    let x = [];
    let y = [];
    let x1 = [];
    let y1 = [];
    while (i < rows.length) {
        x1[i] = rows[i]["Chloride"];
        y1[i] = rows[i]["Phosphorus"];
        x.push(x1);   //(row["Year"][i]>yearTo && row["Year"][i]<yearFrom) ? row["Year"] : null);               //(row["Year"]); 
        y.push(y1);
        i += 1;
    }
    makePlotForNP(x, y);
}

function makePlotForNP(x, y) {
    let traces = [
        {
            x: x,
            y: y,
            name: "Phosphorus",
            mode: "markers",
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: "Phosphorus",
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: 'Phosphorus',
        },
        xaxis: {
            title: "row",
            tickmode: 'linear'
        },



    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot_np", traces, layout, config);
    //description = "The graph shows Total Nitrogen amount(on Y) recorded in mentioned year(on X). The red horizontal line indicates the threshold value for Nitrogen in drinking water of Lake Ontario is 10 mg/L.<br>The maximum acceptable concentration (MAC) for nitrate in drinking water is 45 mg/L. This is equivalent to 10 mg/L measured as nitrate-nitrogen. The MAC for nitrite in drinking water is 3 mg/L. This is equivalent to 1 mg/L measured as nitrite-nitrogen." + note;
    //document.getElementById('des1').innerHTML = description;


}
// for map========================================================================================================
$('#mapButton').on('click', function () {
    $.ajax({
        type: 'POST',
        url: '/plotMap',
        data: 1000,
        // contentType: false,
        // processData: false,
        headers: { "X-CSRFToken": csrftoken },

        success: function (data) {
            if (data) {
                htmlmapdev = "<div class='mt-2' >{{" + data.m + " | safe}}</div>";
                $('#map').html(htmlmapdiv);
            } else {
                console.log("error saving file");
            }
        },
        error: function (error) {
            console.log("Error" + JSON.stringify(error));
        }
    });
});

function mapSelectDropDown() {
    let currentYear = 2020;
    let earliestYear = 2000;
    var selectboxreturn = "<option value='' selected disabled>From year</option>";
    while (currentYear >= earliestYear) {
        selectboxreturn += "<option value='" + currentYear + "'>" + currentYear + "</option>";
        currentYear -= 1;
    }
    return selectboxreturn;
}

$("#mapyearselect").change(function () {
    console.log("mapyearselect === ", $(this).val());
    var mapYear = 2010;
    mapYear = $(this).val();
    $.ajax({
        type: 'get',
        url: '/getYearForAnalysisMap',
        data: { 'year': mapYear, 'data_type':data_type },
        // contentType: false,
        // processData: false,
        headers: { "X-CSRFToken": csrftoken },

        success: function (data) {
            console.log(data.status);
        },
        error: function (error) {
            console.log("Error" + JSON.stringify(error));
        }
    });
});


function senduserinfo(){
    console.log('senduserinfo');
    var name = 'disha';
    var age = '23';
    var url = '/trial?name='+name+'&age='+age;
    alert(url);
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    // request.onload = () =>{
    //     const flagmsg = request.responseText;
    //     console.log(flagmsg);
    // }
    request.send();
}