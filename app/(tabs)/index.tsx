import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [deskripsi, setDeskripsi] = useState("");
  const [nominal, setNominal] = useState("");

  const [transaksi, setTransaksi] = useState([
    {
      id: "1",
      ket: "Uang Saku",
      nominal: 100000,
      tipe: "masuk",
    },
    {
      id: "2",
      ket: "Beli Makan",
      nominal: 25000,
      tipe: "keluar",
    },
  ]);

  // Hitung saldo
  const totalSaldo = transaksi.reduce((total, item) => {
    if (item.tipe === "masuk") {
      return total + item.nominal;
    } else {
      return total - item.nominal;
    }
  }, 0);

  // Tambah transaksi
  const tambahTransaksi = (tipe: string) => {
    if (deskripsi === "" || nominal === "") {
      alert("Isi semua data!");
      return;
    }

    const dataBaru = {
      id: Date.now().toString(),
      ket: deskripsi,
      nominal: parseInt(nominal),
      tipe: tipe,
    };

    setTransaksi([dataBaru, ...transaksi]);

    setDeskripsi("");
    setNominal("");
  };

  return (
    <View style={styles.container}>
      {/* Header Saldo */}
      <View style={styles.cardSaldo}>
        <Text style={styles.labelSaldo}>Total Saldo</Text>
        <Text style={styles.saldo}>
          Rp {totalSaldo.toLocaleString("id-ID")}
        </Text>
      </View>

      {/* Form Input */}
      <View style={styles.form}>
        <TextInput
          placeholder="Masukkan Deskripsi"
          style={styles.input}
          value={deskripsi}
          onChangeText={setDeskripsi}
        />

        <TextInput
          placeholder="Masukkan Nominal"
          style={styles.input}
          keyboardType="numeric"
          value={nominal}
          onChangeText={setNominal}
        />

        {/* Tombol */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.masukButton]}
            onPress={() => tambahTransaksi("masuk")}
          >
            <Text style={styles.buttonText}>Pemasukan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.keluarButton]}
            onPress={() => tambahTransaksi("keluar")}
          >
            <Text style={styles.buttonText}>Pengeluaran</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* History */}
      <Text style={styles.historyTitle}>Riwayat Transaksi</Text>

      <FlatList
        data={transaksi}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.keterangan}>{item.ket}</Text>
              <Text style={styles.tipe}>
                {item.tipe === "masuk" ? "Pemasukan" : "Pengeluaran"}
              </Text>
            </View>

            <Text
              style={[
                styles.nominal,
                {
                  color: item.tipe === "masuk" ? "green" : "red",
                },
              ]}
            >
              {item.tipe === "masuk" ? "+" : "-"} Rp{" "}
              {item.nominal.toLocaleString("id-ID")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },

  cardSaldo: {
    backgroundColor: "#2563eb",
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  labelSaldo: {
    color: "white",
    fontSize: 18,
  },

  saldo: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },

  form: {
    marginBottom: 20,
  },

  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },

  masukButton: {
    backgroundColor: "green",
  },

  keluarButton: {
    backgroundColor: "red",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  keterangan: {
    fontSize: 16,
    fontWeight: "bold",
  },

  tipe: {
    fontSize: 14,
    color: "gray",
    marginTop: 3,
  },

  nominal: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
