import os
u = {10289: 'Klimczak', 29035: 'Kwiatkowski', 46003: 'Karpiejczyk', 44295: 'Lamandini', 12112: 'Gąsienica-Samek', 436: 'Czajka', 13884: 'Fiuk', 441: 'Nadara', 53286: 'Dubovik', 29344: 'Olejnik', 111545: 'Długosz', 7736: 'Pluta', 9582: 'Czarkowski', 6106: 'Potępa', 12601: 'Czarkowski', 348: 'Sommer', 15433: 'Mańczyk', 15763: 'Targowski', 11579: 'Buraczewski', 31485: 'Topolski'}

for f in os.listdir("images"):
    name = os.path.basename(f).split(".")[0]
    for k, v in u.items():
        if v in name:
            os.rename(f"images/{f}", f"images/{k}.jpg")
            break

for f in os.listdir("images"):
    n = f.split(".")[0]
    print(f'import i{n} from "../../assets/university_logos/{f}";')

print("images = {")
for f in os.listdir("images"):
    n = f.split(".")[0]
    print(f'i{n},')
print("};")
