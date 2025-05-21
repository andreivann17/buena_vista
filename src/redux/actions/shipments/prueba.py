import random
import json
from datetime import datetime, timedelta

nombres = [
    "Juan Pérez", "Sofía Torres", "Luis Hernández", "María González", "Carlos Méndez",
    "Ana López", "David García", "Paola Sánchez", "José Hernández", "Daniela Castro",
    "Victor Salinas", "Alejandra Flores", "Eduardo Vargas", "Karla Medina", "Fernando Ruiz",
    "Gabriela Reyes", "Andrés Núñez", "Lucía Ortega", "Roberto Silva", "Andrea Aguirre",
    "Santiago Cruz", "Isabela Navarro", "Miguel Rivera", "Camila Estrada", "Jorge Paredes",
    "Laura Herrera", "Pedro Suárez", "Liliana Vega", "Héctor Delgado", "Silvia Ríos"
]

pmb_por_persona = {}
pmb_usados = set()

for nombre in nombres:
    while True:
        pmb = ''.join(random.choices('0123456789', k=6))
        if pmb not in pmb_usados:
            pmb_por_persona[nombre] = pmb
            pmb_usados.add(pmb)
            break

datos = []
for i in range(1, 5001):
    nombre = random.choice(nombres)
    fecha_recibido = datetime(2024, random.randint(1, 12), random.randint(1, 28))
    fecha_entrega = fecha_recibido + timedelta(days=random.randint(1, 7))
    codigo = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=8))
    nombre_entrega = random.choice(nombres)

    datos.append({
        "RecordNumber": str(i).zfill(4),                    # 🔁 NumRegistro
        "ReceivedDate": fecha_recibido.strftime("%Y-%m-%d"),# 🔁 FechaRecibido
        "Name": nombre,                                     # 🔁 Nombre
        "code": codigo,                                     # 🔁 Codigo
        "DeliveryDate": fecha_entrega.strftime("%Y-%m-%d"), # 🔁 FechaEntrega
        "DeliveredBy": nombre_entrega,                      # 🔁 NombreEntrega
        "pmb": pmb_por_persona[nombre]                      # 🔁 pmb
    })

with open('prueba.json', 'w', encoding='utf-8') as f:
    json.dump(datos, f, indent=2, ensure_ascii=False)

print("Archivo 'prueba.json' guardado exitosamente ✅")
