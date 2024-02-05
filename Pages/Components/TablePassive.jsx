import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Modal, ScrollView, Text, View} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';
import TouchableScale from 'react-native-touchable-scale';
import {Toast} from 'toastify-react-native';

export const TablePassive = ({setIsLoading, isLoading, styles}) => {
  const [getData, setData] = useState(null); // Definisikan state untuk menyimpan data
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      await axios.get('sanctum/csrf-cookie');
      const response = await axios.get('api/history/passive/get');
      if (response.data.status === 200) {
        setData(response.data.data.data); // Set data ke state
        setCurrentPage(response.data.currentPage);
        setLastPage(response.data.data.last_page);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const fetchNextPage = async () => {
    setIsLoading(true);
    console.log('curret ' + currentPage);
    console.log('last ' + lastPage);
    if (lastPage <= currentPage) {
      setIsLoading(false);
      return Toast.info('there is no data on the next page');
    }
    if (lastPage > currentPage) {
      try {
        await axios.get('sanctum/csrf-cookie');
        const response = await axios.get(
          `api/history/passive/get?page=${currentPage + 1}`,
        );
        if (response.data.status === 200) {
          setData(response.data.data.data); // Set data ke state
          setCurrentPage(response.data.currentPage);
          setLastPage(response.data.data.last_page);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.error('Error fetching next page:', error);
      }
    }
  };

  const fetchPrevPage = async () => {
    setIsLoading(true);
    console.log('prev curret ' + currentPage);
    console.log('prev last ' + lastPage);
    if (lastPage <= currentPage || currentPage <= 1) {
      setIsLoading(false);
      return Toast.info('there is no data on the preview page');
    }
    if (lastPage > currentPage && currentPage >= 0) {
      try {
        await axios.get('sanctum/csrf-cookie');
        const response = await axios.get(
          `api/history/passive/get?page=${currentPage - 1}`,
        );
        if (response.data.status === 200) {
          setData(response.data.data.data); // Set data ke state
          setCurrentPage(response.data.currentPage);
          setLastPage(response.data.data.last_page);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.error('Error fetching next page:', error);
      }
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <>
      {getData && getData.map && (
        <ScrollView horizontal={true}>
          <Table
            borderStyle={{
              borderWidth: 2,
              borderColor: 'rgba(140, 140, 140, 0.1)',
            }}>
            <Row
              data={['No', 'date', 'detail', 'Debit', 'username', 'label']}
              style={styles.head}
              textStyle={{
                ...styles.text,
                fontWeight: 'bold', // tambahkan gaya teks tambahan di sini jika diperlukan
              }}
            />

            <Rows
              style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
              data={getData.map((rowData, index) => {
                return [
                  currentPage > 1
                    ? (currentPage - 1) * 10 + index + 1
                    : index + 1,
                  rowData.updated_at,
                  rowData.description,
                  rowData.username,
                  rowData.label,
                  rowData.balance,
                ];
              })}
              textStyle={styles.text}
            />
          </Table>
        </ScrollView>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}>
        <TouchableScale style={styles.button} onPress={fetchPrevPage}>
          <Text style={{color: '#fff'}}>Previous Page</Text>
        </TouchableScale>
        <Text style={{color: '#fff'}}>{currentPage + ' of ' + lastPage}</Text>
        <TouchableScale style={styles.button} onPress={fetchNextPage}>
          <Text style={{color: '#fff'}}>Next</Text>
        </TouchableScale>
      </View>
      <View style={styles.container}>
        <Modal transparent={true} animationType="slide" visible={isLoading}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
        </Modal>
      </View>
    </>
  );
};
