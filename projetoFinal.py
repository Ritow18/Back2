import sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

#conexão com o banco de dados
conn = sqlite3.connect("restaurantes.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurante TEXT NOT NULL,
    nota REAL NOT NULL,
    comentario TEXT,
    autor_id TEXT NOT NULL
)
""")
conn.commit()


# autenticação com tokens fictícios
TOKENS = {
    "token_user1": "user1",
    "token_user2": "user3",
    "token_adm": "adm"
}

def autenticar():
    token = request.headers.get("Authorization")
    if token in TOKENS:
        return TOKENS[token]  # retorna autor_id
    return None


# endpoints da api
@app.route("/api/avaliacoes", methods=["GET"])
def get_all_avaliacoes():
    cursor.execute("SELECT * FROM avaliacoes")
    linhas = cursor.fetchall()

    dados = [
        {"id": c[0], "restaurante": c[1], "nota": c[2], "comentario": c[3], "autor_id": c[4]}
        for c in linhas
    ]
    return jsonify(dados)


# visualizar avaliação especifica
@app.route("/api/avaliacoes/<int:avaliacao_id>", methods=["GET"])
def get_avaliacao(avaliacao_id):
    cursor.execute("SELECT * FROM avaliacoes WHERE id = ?", (avaliacao_id,))
    c = cursor.fetchone()

    if not c:
        return jsonify({"erro": "Crítica não encontrada"}), 404

    return jsonify({"id": c[0], "restaurante": c[1], "nota": c[2], "comentario": c[3], "autor_id": c[4]})


# postar uma avaliação (requer autenticação)
@app.route("/api/avaliacoes", methods=["POST"])
def criar_avaliacao():
    usuario = autenticar()
    if not usuario:
        return jsonify({"erro": "Token inválido ou ausente"}), 401

    dados = request.json

    cursor.execute(
        "INSERT INTO avaliacoes (restaurante, nota, comentario, autor_id) VALUES (?, ?, ?, ?)",
        (dados["restaurante"], dados["nota"], dados.get("comentario", ""), usuario)
    )
    conn.commit()

    return jsonify({"mensagem": "Crítica criada com sucesso!"}), 201


# PUT editar avaliação (autorização: autor ou admin)
@app.route("/api/avaliacoes/<int:avaliacao_id>", methods=["PUT"])
def editar_avaliacao(avaliacao_id):
    usuario = autenticar()
    if not usuario:
        return jsonify({"erro": "Token inválido ou ausente"}), 401

    cursor.execute("SELECT autor_id FROM avaliacoes WHERE id = ?", (avaliacao_id,))
    c = cursor.fetchone()

    if not c:
        return jsonify({"erro": "Crítica não encontrada"}), 404

    autor_original = c[0]

    # Verifica autorização: só o autor da crítica OU admin pode editar
    if usuario != autor_original and usuario != "adm":
        return jsonify({"erro": "Sem permissão para editar"}), 403

    dados = request.json

    cursor.execute("""
        UPDATE avaliacoes 
        SET restaurante = ?, nota = ?, comentario = ?
        WHERE id = ?
    """, (dados["restaurante"], dados["nota"], dados.get("comentario", ""), avaliacao_id))

    conn.commit()

    return jsonify({"mensagem": "Crítica atualizada!"})


# deletar avaliação (autorização: autor ou admin)
@app.route("/api/avaliacoes/<int:avaliacao_id>", methods=["DELETE"])
def deletar_avaliacao(avaliacao_id):
    usuario = autenticar()
    if not usuario:
        return jsonify({"erro": "Token inválido ou ausente"}), 401

    cursor.execute("SELECT autor_id FROM avaliacoes WHERE id = ?", (avaliacao_id,))
    c = cursor.fetchone()

    if not c:
        return jsonify({"erro": "Crítica não encontrada"}), 404

    autor_original = c[0]

    if usuario != autor_original and usuario != "adm":
        return jsonify({"erro": "Sem permissão para deletar"}), 403

    cursor.execute("DELETE FROM avaliacoes WHERE id = ?", (avaliacao_id,))
    conn.commit()

    return jsonify({"mensagem": "Crítica removida!"})


# inicia o server
if __name__ == "__main__":
    app.run(debug=True)
