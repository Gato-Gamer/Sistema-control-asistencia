import pyodbc
import os
import sys
import json

def get_connection_string(mdb_file):
    if os.name == 'nt':  # Windows
        return rf'DRIVER={{Microsoft Access Driver (*.mdb, *.accdb)}};DBQ={mdb_file};'
    else:  # Linux
        return f'DSN=MDBDatabase;DBQ={mdb_file};'

def fetch_data(mdb_file, table_name):
    connection_string = get_connection_string(mdb_file)
    
    try:
        conn = pyodbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute(f'SELECT USERID, CHECKTIME FROM {table_name}')
        
        rows = cursor.fetchall()
        data = []
        
        for row in rows:
            # Convertir el campo de fecha a una cadena en formato ISO 8601
            date_field_str = row.CHECKTIME.strftime('%Y-%m-%d %H:%M:%S') if row.CHECKTIME else None

            data.append({
                "USERID": row.USERID,
                "CHECKTIME": date_field_str
            })
        
        # Convertir la lista de diccionarios a JSON y mostrarla
        print(json.dumps(data, indent=2))
        
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python access_mdb.py <path_to_mdb_file> <table_name>")
        sys.exit(1)

    mdb_file = sys.argv[1]
    table_name = sys.argv[2]

    fetch_data(mdb_file, table_name)
