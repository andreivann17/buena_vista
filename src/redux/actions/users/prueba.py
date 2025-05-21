import random
import json
from datetime import datetime, timedelta

# Lista de nombres principales
nombres = [
    "Juan Pérez", "Sofía Torres", "Luis Hernández", "María González", "Carlos Méndez",
    "Ana López", "David García", "Paola Sánchez", "José Hernández", "Daniela Castro",
    "Victor Salinas", "Alejandra Flores", "Eduardo Vargas", "Karla Medina", "Fernando Ruiz",
    "Gabriela Reyes", "Andrés Núñez", "Lucía Ortega", "Roberto Silva", "Andrea Aguirre",
    "Santiago Cruz", "Isabela Navarro", "Miguel Rivera", "Camila Estrada", "Jorge Paredes",
    "Laura Herrera", "Pedro Suárez", "Liliana Vega", "Héctor Delgado", "Silvia Ríos"
]

# Asignar un PMB único a cada persona
pmb_por_persona = {}
pmb_usados = set()

for nombre in nombres:
    while True:
        pmb = ''.join(random.choices('0123456789', k=6))  # 6 dígitos numéricos
        if pmb not in pmb_usados:
            pmb_por_persona[nombre] = pmb
            pmb_usados.add(pmb)
            break

# Generador de datos
datos = []
for i in range(1, 5001):  # ahora muchísimos más registros como pediste
    nombre = random.choice(nombres)
    fecha_recibido = datetime(2024, random.randint(1, 12), random.randint(1, 28))
    fecha_entrega = fecha_recibido + timedelta(days=random.randint(1, 7))  # siempre posterior
    codigo = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=8))
    nombre_entrega = random.choice(nombres)
    
    datos.append({
        "NumRegistro": str(i).zfill(4),
        "FechaRecibido": fecha_recibido.strftime("%Y-%m-%d"),
        "Nombre": nombre,
        "Codigo": codigo,
        "FechaEntrega": fecha_entrega.strftime("%Y-%m-%d"),
        "NombreEntrega": nombre_entrega,
        "pmb": pmb_por_persona[nombre]  # 🔥 se añade el pmb correspondiente
    })

# Guardarlo en archivo
with open('prueba.json', 'w', encoding='utf-8') as f:
    json.dump(datos, f, indent=2, ensure_ascii=False)

print("Archivo 'prueba.json' guardado exitosamente ✅")
