import pandas as pd
import json
import os
import re
from difflib import SequenceMatcher

# Faculty data from your constants
faculties = [
    {"id": "faculty-of-education", "th": "คณะครุศาสตร์", "en": "Faculty of Education"},
    {"id": "faculty-of-psychology", "th": "คณะจิตวิทยา", "en": "Faculty of Psychology"},
    {"id": "faculty-of-dentistry", "th": "คณะทันตแพทยศาสตร์", "en": "Faculty of Dentistry"},
    {"id": "faculty-of-law", "th": "คณะนิติศาสตร์", "en": "Faculty of Law"},
    {"id": "faculty-of-communication-arts", "th": "คณะนิเทศศาสตร์", "en": "Faculty of Communication Arts"},
    {"id": "faculty-of-nursing", "th": "คณะพยาบาลศาสตร์", "en": "Faculty of Nursing"},
    {"id": "faculty-of-commerce-and-accountancy", "th": "คณะพาณิชยศาสตร์และการบัญชี", "en": "Faculty of Commerce and Accountancy"},
    {"id": "faculty-of-medicine", "th": "คณะแพทยศาสตร์", "en": "Faculty of Medicine"},
    {"id": "faculty-of-pharmacy", "th": "คณะเภสัชศาสตร์", "en": "Faculty of Pharmacy"},
    {"id": "faculty-of-political-science", "th": "คณะรัฐศาสตร์", "en": "Faculty of Political Science"},
    {"id": "faculty-of-science", "th": "คณะวิทยาศาสตร์", "en": "Faculty of Science"},
    {"id": "faculty-of-sports-science", "th": "คณะวิทยาศาสตร์การกีฬา", "en": "Faculty of Sports Science"},
    {"id": "faculty-of-engineering", "th": "คณะวิศวกรรมศาสตร์", "en": "Faculty of Engineering"},
    {"id": "faculty-of-fine-and-applied-arts", "th": "คณะศิลปกรรมศาสตร์", "en": "Faculty of Fine and Applied Arts"},
    {"id": "faculty-of-economics", "th": "คณะเศรษฐศาสตร์", "en": "Faculty of Economics"},
    {"id": "faculty-of-architecture", "th": "คณะสถาปัตยกรรมศาสตร์", "en": "Faculty of Architecture"},
    {"id": "faculty-of-allied-health-sciences", "th": "คณะสหเวชศาสตร์", "en": "Faculty of Allied Health Sciences"},
    {"id": "faculty-of-veterinary-science", "th": "คณะสัตวแพทยศาสตร์", "en": "Faculty of Veterinary Science"},
    {"id": "faculty-of-arts", "th": "คณะอักษรศาสตร์", "en": "Faculty of Arts"},
    {"id": "chulalongkorn-university-integrated-innovation-institute", "th": "สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย", "en": "Chulalongkorn University Integrated Innovation Institute"},
    {"id": "school-of-agricultural-resources", "th": "สำนักวิชาทรัพยากรการเกษตร", "en": "School of Agricultural Resources"},
    {"id": "graduate-school", "th": "บัณฑิตวิทยาลัย", "en": "Graduate School"},
    {"id": "college-of-population-studies", "th": "วิทยาลัยประชากรศาสตร์", "en": "College of Population Studies"},
    {"id": "college-of-petroleum-and-petrochemical-engineering", "th": "วิทยาลัยปิโตรเลียมและปิโตรเคมี", "en": "College of Petroleum and Petrochemical Engineering"},
    {"id": "college-of-public-health-sciences", "th": "วิทยาลัยวิทยาศาสตร์สาธารณสุข", "en": "College of Public Health Sciences"},
    {"id": "institute-of-transport", "th": "สถาบันการขนส่ง", "en": "Institute of Transport"},
    {"id": "confucius-institute-at-chulalongkorn-university", "th": "สถาบันขงจื่อแห่งจุฬาลงกรณ์มหาวิทยาลัย", "en": "Confucius Institute at Chulalongkorn University"},
    {"id": "chulalongkorn-university-intellectual-property-institute", "th": "สถาบันทรัพย์สินทางปัญญาแห่งจุฬาลงกรณ์มหาวิทยาลัย", "en": "Chulalongkorn University Intellectual Property Institute"},
    {"id": "thai-studies-institute", "th": "สถาบันไทยศึกษา", "en": "Thai Studies Institute"},
    {"id": "sasin-graduate-institute-of-business-administration", "th": "สถาบันบัณฑิตบริหารธุรกิจศศินทร์แห่งจุฬาลงกรณ์มหาวิทยาลัย", "en": "Sasin Graduate Institute of Business Administration"},
    {"id": "language-institute", "th": "สถาบันภาษาจุฬาฯ", "en": "Language Institute"},
    {"id": "sirindhorn-thai-language-institute", "th": "สถาบันภาษาไทยสิรินธรแห่งจุฬาลงกรณ์มหาวิทยาลัย", "en": "Sirindhorn Thai Language Institute"},
    {"id": "research-institute-for-water-resources", "th": "สถาบันวิจัยทรัพยากรทางน้ำ", "en": "Research Institute for Water Resources"},
    {"id": "biotechnology-and-genetic-engineering-research-unit", "th": "สถาบันวิจัยเทคโนโลยีชีวภาพและวิศวกรรมพันธุศาสตร์", "en": "Biotechnology and Genetic Engineering Research Unit"},
    {"id": "energy-research-institute", "th": "สถาบันวิจัยพลังงาน", "en": "Energy Research Institute"},
    {"id": "metals-and-materials-research-institute", "th": "สถาบันวิจัยโลหะและวัสดุ", "en": "Metals and Materials Research Institute"},
    {"id": "research-institute-for-sustainable-environment", "th": "สถาบันวิจัยสิ่งแวดล้อมเพื่อความยั่งยืน", "en": "Research Institute for Sustainable Environment"},
    {"id": "social-research-institute", "th": "สถาบันวิจัยสังคม", "en": "Social Research Institute"},
    {"id": "institute-of-asian-studies", "th": "สถาบันเอเชียศึกษา", "en": "Institute of Asian Studies"}
]

# Faculty to short name mapping
faculty_short_names = {
    "faculty-of-education": "EDU",
    "faculty-of-psychology": "PSY",
    "faculty-of-dentistry": "DEN",
    "faculty-of-law": "LAW",
    "faculty-of-communication-arts": "COM",
    "faculty-of-nursing": "NUR",
    "faculty-of-commerce-and-accountancy": "ACC",
    "faculty-of-medicine": "MED",
    "faculty-of-pharmacy": "PHA",
    "faculty-of-political-science": "POL",
    "faculty-of-science": "SCI",
    "faculty-of-sports-science": "SPO",
    "faculty-of-engineering": "ENG",
    "faculty-of-fine-and-applied-arts": "FAAART",
    "faculty-of-economics": "ECO",
    "faculty-of-architecture": "ARC",
    "faculty-of-allied-health-sciences": "AHS",
    "faculty-of-veterinary-science": "VET",
    "faculty-of-arts": "ART",
    "chulalongkorn-university-integrated-innovation-institute": "CUIII",
    "school-of-agricultural-resources": "AGR",
    "graduate-school": "GRAD",
    "college-of-population-studies": "POP",
    "college-of-petroleum-and-petrochemical-engineering": "PET",
    "college-of-public-health-sciences": "PHS",
    "institute-of-transport": "TRA",
    "confucius-institute-at-chulalongkorn-university": "CI",
    "chulalongkorn-university-intellectual-property-institute": "CUIP",
    "thai-studies-institute": "TSI",
    "sasin-graduate-institute-of-business-administration": "SASIN",
    "language-institute": "LANG",
    "sirindhorn-thai-language-institute": "STLI",
    "research-institute-for-water-resources": "RIWR",
    "biotechnology-and-genetic-engineering-research-unit": "BIOTEC",
    "energy-research-institute": "ERI",
    "metals-and-materials-research-institute": "MMRI",
    "research-institute-for-sustainable-environment": "RISE",
    "social-research-institute": "SRI",
    "institute-of-asian-studies": "IAS"
}

# Column names in Thai
column_names = [
    'ลำดับ',
    'ชื่อกิจกรรม',
    'กิจกรรมของคณะ/ภาค',
    'สถานที่จัดกิจกรรม',
    'จำนวนรอบที่จัดต่อวัน',
    'เวลาในการจัด',
    'รายละเอียดกิจกรรม',
    'จำนวนผู้เข้าร่วมแต่ละรอบ',
    'IG',
    'FB'
]

# Cache for sheet to faculty mapping
sheet_to_faculty_map = {}

def similarity_score(a, b):
    """Calculate similarity between two strings"""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def find_best_match_faculty(sheet_name):
    """Find the best matching faculty for a sheet name using fuzzy matching"""
    if sheet_name in sheet_to_faculty_map:
        return sheet_to_faculty_map[sheet_name]
    
    best_score = 0
    best_faculty = None
    
    # Try matching with Thai names first (higher priority)
    for faculty in faculties:
        # Check Thai name
        score_th = similarity_score(sheet_name, faculty["th"])
        if score_th > best_score:
            best_score = score_th
            best_faculty = faculty
    
    # If no good match with Thai names, try English names
    if best_score < 0.5:  # Threshold for acceptable match
        for faculty in faculties:
            # Check English name
            score_en = similarity_score(sheet_name, faculty["en"])
            if score_en > best_score:
                best_score = score_en
                best_faculty = faculty
    
    # If still no good match, try matching parts of the name
    if best_score < 0.5:
        for faculty in faculties:
            # Extract key parts from faculty names
            th_parts = faculty["th"].split()
            en_parts = faculty["en"].split()
            
            # Check if any part strongly matches the sheet name
            for part in th_parts + en_parts:
                if len(part) > 3 and part.lower() in sheet_name.lower():
                    score = len(part) / len(sheet_name)
                    if score > best_score:
                        best_score = score
                        best_faculty = faculty
    
    # If we found a good match
    if best_faculty:
        sheet_to_faculty_map[sheet_name] = best_faculty
        return best_faculty
    
    # Fallback: create a default faculty object with sheet name
    normalized_name = re.sub(r'[^a-zA-Z0-9]', '-', sheet_name.lower())
    normalized_name = re.sub(r'-+', '-', normalized_name).strip('-')
    default_faculty = {
        "id": normalized_name,
        "th": sheet_name,
        "en": sheet_name
    }
    sheet_to_faculty_map[sheet_name] = default_faculty
    return default_faculty

def generate_activity_id(faculty_id, row_index):
    """Generate a unique ID for each activity"""
    # by mapping faculty ID to short name
    faculty_short_name = faculty_short_names.get(faculty_id, None)
    if faculty_short_name is None:
        # panic
        raise ValueError(f"Faculty ID '{faculty_id}' not found in short name mapping")
    
    # Generate activity ID from faculty short name and row index
    activity_id = f"{faculty_short_name}-{row_index:03d}"
    
    return activity_id

def process_excel_file(file_path):
    """Process the Excel file and convert to JSON"""
    # Load the Excel file
    excel_file = pd.ExcelFile(file_path)
    
    all_activities = []
    
    # Process each sheet
    for sheet_name in excel_file.sheet_names:
        try:
            # Read the sheet, starting from row 5 (index 4)
            df = pd.read_excel(excel_file, sheet_name=sheet_name, header=None, skiprows=4)
            
            # Check if dataframe is empty or doesn't have enough columns
            if df.empty or df.shape[1] < len(column_names):
                print(f"Skipping sheet {sheet_name}: insufficient columns or empty")
                continue
            
            # Assign column names to the first n columns
            df = df.iloc[:, :len(column_names)]
            df.columns = column_names
            
            # Find the best matching faculty for this sheet
            faculty = find_best_match_faculty(sheet_name)
            faculty_id = faculty["id"]
            faculty_th = faculty["th"]
            faculty_en = faculty["en"]
            
            print(f"Matched sheet '{sheet_name}' to faculty '{faculty_th}' ({faculty_id})")
            
            # Process each row
            for index, row in df.iterrows():
                # Skip rows with missing essential data
                if pd.isna(row['ชื่อกิจกรรม']):
                    continue
                    
                # Generate activity ID from first character of 
                activity_id = generate_activity_id(faculty_id, index + 1)
                
                # Create activity object
                activity = {
                    "id": activity_id,
                    "facultyId": faculty_id,
                    # "facultyTh": faculty_th,
                    # "facultyEn": faculty_en,
                    "name": str(row['ชื่อกิจกรรม']),
                    "organizer": str(row['กิจกรรมของคณะ/ภาค']) if not pd.isna(row['กิจกรรมของคณะ/ภาค']) else "",
                    "location": str(row['สถานที่จัดกิจกรรม']) if not pd.isna(row['สถานที่จัดกิจกรรม']) else "",
                    "numberOfRounds": str(row['จำนวนรอบที่จัดต่อวัน']) if not pd.isna(row['จำนวนรอบที่จัดต่อวัน']) else "",
                    "time": str(row['เวลาในการจัด']) if not pd.isna(row['เวลาในการจัด']) else "",
                    "description": str(row['รายละเอียดกิจกรรม']) if not pd.isna(row['รายละเอียดกิจกรรม']) else "",
                    "participantsPerRound": str(row['จำนวนผู้เข้าร่วมแต่ละรอบ']) if not pd.isna(row['จำนวนผู้เข้าร่วมแต่ละรอบ']) else "",
                    "instagram": str(row['IG']) if not pd.isna(row['IG']) else "",
                    "facebook": str(row['FB']) if not pd.isna(row['FB']) else "",
                    # "sheetName": sheet_name  # Keep original sheet name for reference
                }
                
                all_activities.append(activity)
        except Exception as e:
            print(f"Error processing sheet {sheet_name}: {str(e)}")
    
    # Convert to JSON
    return json.dumps(all_activities, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    file_path = r"data\[OPH 2025] รวบรวมข้อมูลคณะ - กิจกรรม.xlsx"
    
    # Check if file exists
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found.")
        exit(1)
    
    try:
        json_output = process_excel_file(file_path)

        # save as json stringify
        # remote \n and replace \" with \\"
        json_output = json_output.replace("\\n", "").replace("\\\"", "\\\\\"")
        # clean irregular whitespace
        json_output = re.sub(r'\s+', ' ', json_output)
        # clean ​ (U+200B) zero width space
        json_output = json_output.replace("\u200b", "")
        
        output_file = "faculty_activities.json"
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(json_output)
            
        
        print(f"Successfully extracted data and saved to {output_file}")
    except Exception as e:
        print(f"Error processing file: {str(e)}")