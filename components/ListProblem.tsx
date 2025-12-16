import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card, Divider, Icon, List, Text } from "react-native-paper";
import { RootStackParamList } from "../context";
import { FlatList, ScrollView, View, StyleSheet } from "react-native";
import { useEffect, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { imagePathMapping } from "../utils/imagePathMapping";

type Props = NativeStackScreenProps<RootStackParamList, 'ListProblem'>;

export default function ListProblem({ navigation, route }: Props) {

    const { toko5 } = route.params;

    useLayoutEffect(() => {
    navigation.setOptions({
      title: `TOKO 5 de ${toko5.prenomContractant} ${toko5.nomContractant}`,
    });
  }, [navigation, toko5]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const getStatusConfig = (etat: string) => {
    switch(etat?.toLowerCase()) {
      case 'ongoing':
        return { color: '#FFA726', icon: 'clock-outline', label: 'En cours' };
      case 'valide':
        return { color: '#4CAF50', icon: 'check-circle-outline', label: 'Valide' };
      case 'invalide':
        return { color: '#F44336', icon: 'close-circle-outline', label: 'invalide' };
      default:
        return { color: '#757575', icon: 'help-circle-outline', label: 'Inconnu' };
    }
  };

  const { date, time } = formatDate(toko5.dateHeure);
  const status = getStatusConfig(toko5.etat);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Card */}
        <Card style={styles.headerCard} mode='contained'>
          <Card.Content>
            <View style={styles.headerContent}>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: status.color }]} />
                <Text style={[styles.statusText, { color: status.color }]}>
                  {status.label}
                </Text>
              </View>
              
              <View style={styles.dateTimeContainer}>
                <View style={styles.dateTimeItem}>
                  <Icon source="calendar" size={16} color="#666" />
                  <Text style={styles.dateTimeText}>{date}</Text>
                </View>
                <View style={styles.dateTimeItem}>
                  <Icon source="clock-outline" size={16} color="#666" />
                  <Text style={styles.dateTimeText}>{time}</Text>
                </View>
              </View>
              
              <View style={styles.contractorContainer}>
                <Icon source="account-hard-hat" size={20} color="#2196F3" />
                <View style={styles.contractorInfo}>
                  <Text style={styles.contractorLabel}>Contractant</Text>
                  <Text style={styles.contractorName}>
                    {toko5.prenomContractant} {toko5.nomContractant}
                  </Text>
                </View>
              </View>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{toko5.listMesureControle?.length || 0}</Text>
                  <Text style={styles.statLabel}>Mesures</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{toko5.listCommentaire?.length || 0}</Text>
                  <Text style={styles.statLabel}>Commentaires</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{toko5.listProblem?.length || 0}</Text>
                  <Text style={styles.statLabel}>Problèmes</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Control Measures Section */}
        {toko5.listMesureControle && toko5.listMesureControle.length > 0 && (
          <Card style={styles.sectionCard} mode='contained'>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Icon source="clipboard-check" size={24} color="#2196F3" />
                <Text style={styles.sectionTitle}>
                  Mesures de Contrôle ({toko5.listMesureControle.length})
                </Text>
              </View>
              
              <FlatList
                data={toko5.listMesureControle}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <View style={styles.measureItem}>
                    <View style={styles.measureHeader}>
                      <View style={styles.measureIndex}>
                        <Text style={styles.measureIndexText}>{index + 1}</Text>
                      </View>
                      <View style={styles.measureTitleContainer}>
                        <Text style={styles.measureId}>Mesure #{item.mesureControleId}</Text>
                        <View style={styles.implementedBadge}>
                          <Icon 
                            source={item.implemented ? "check" : "alert-circle"} 
                            size={12} 
                            color="white" 
                          />
                          <Text style={styles.implementedText}>
                            {item.implemented ? 'Implémentée' : 'En attente'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    
                    <Text style={styles.measureDescription}>{item.mesurePrise}</Text>
                    
                    {item.question && (
                      <View style={styles.questionContainer}>
                        <Text style={styles.questionLabel}>Danger/risque</Text>
                        {/* <Text style={styles.questionText}>{item.question.text}</Text> */}
                        <Icon source={imagePathMapping(item.question.pictogramme)} size={40} />
                      </View>
                    )}
                    
                    {index < toko5.listMesureControle.length - 1 && (
                      <Divider style={styles.itemDivider} />
                    )}
                  </View>
                )}
              />
            </Card.Content>
          </Card>
        )}

        {/* Comments Section */}
        {toko5.listCommentaire && toko5.listCommentaire.length > 0 && (
          <Card style={styles.sectionCard} mode='contained'>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Icon source="message-text" size={24} color="#2196F3" />
                <Text style={styles.sectionTitle}>
                  Commentaires ({toko5.listCommentaire.length})
                </Text>
              </View>
              
              <FlatList
                data={toko5.listCommentaire}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <View style={styles.commentItem}>
                    <View style={styles.commentHeader}>
                      <View style={styles.commentAvatar}>
                        <Text style={styles.commentAvatarText}>
                          {item.prenom?.charAt(0)}{item.nom?.charAt(0)}
                        </Text>
                      </View>
                      <View style={styles.commentInfo}>
                        <Text style={styles.commentAuthor}>
                          {item.prenom} {item.nom}
                        </Text>
                        <Text style={styles.commentId}>#{item.commentaireId}</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.commentText}>{item.commentaire}</Text>
                    
                    {index < toko5.listCommentaire.length - 1 && (
                      <Divider style={styles.itemDivider} />
                    )}
                  </View>
                )}
              />
            </Card.Content>
          </Card>
        )}

        {/* Problems Section - Show even if empty for awareness */}
        <Card style={[styles.sectionCard, 
          toko5.listProblem?.length === 0 && styles.emptySection
        ]} mode='contained'>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon 
                source={toko5.listProblem?.length > 0 ? "alert-circle" : "check-circle"} 
                size={24} 
                color={toko5.listProblem?.length > 0 ? "#F44336" : "#4CAF50"} 
              />
              <Text style={styles.sectionTitle}>
                Problèmes ({toko5.listProblem?.length || 0})
              </Text>
            </View>
            
            {toko5.listProblem?.length > 0 ? (
              <FlatList
                data={toko5.listProblem}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <Text style={styles.problemText}>• {item.description}</Text>
                )}
              />
            ) : (
              <View style={styles.emptyState}>
                <Icon source="check" size={32} color="#4CAF50" />
                <Text style={styles.emptyStateText}>Aucun problème signalé</Text>
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 0.2
  },
  headerContent: {
    padding: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#666',
  },
  contractorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  contractorInfo: {
    flex: 1,
  },
  contractorLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  contractorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#d0e3ff',
    marginHorizontal: 8,
  },
  sectionCard: {
    padding: 7,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 0.2
  },
  emptySection: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  measureItem: {
    paddingVertical: 12,
  },
  measureHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 12,
  },
  measureIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  measureIndexText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  measureTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  measureId: {
    fontSize: 14,
    color: '#666',
  },
  implementedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  implementedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  measureDescription: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 8,
  },
  questionContainer: {
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  questionLabel: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
    marginBottom: 4,
  },
  questionText: {
    fontSize: 14,
    color: '#555',
  },
  commentItem: {
    paddingVertical: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAvatarText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  commentInfo: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  commentId: {
    fontSize: 12,
    color: '#999',
  },
  commentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  problemText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  itemDivider: {
    marginTop: 16,
    backgroundColor: '#eee',
  },
});
