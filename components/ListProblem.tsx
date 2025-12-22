import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card, Divider, Icon, List, Text, useTheme, Button, TextInput } from "react-native-paper";
import { CommentaireDto, DatabaseContext, MesureControleDto, QuestionDto, RootStackParamList, Toko5Json } from "../context";
import { FlatList, ScrollView, View, StyleSheet } from "react-native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { imagePathMapping } from "../utils/imagePathMapping";
import { addCommentaire } from "../services/ApiService";
import Toko5Repository from "../repository/Toko5Repository";
import * as SecureStore from 'expo-secure-store';

type Props = NativeStackScreenProps<RootStackParamList, 'ListProblem'>;

export default function ListProblem({ navigation, route }: Props) {

  const theme = useTheme();

  //const { toko5 }: { toko5: Toko5Json } = route.params;

  const [toko5, setToko5] = useState<Toko5Json>(route.params.toko5);

  const toko5Repository = useContext(DatabaseContext);

  const [newComment, setNewComment] = useState("");

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
    switch (etat?.toLowerCase()) {
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

  const handleAddComment = async () => {
    //console.log("Add comment pressed");
    let nom = await SecureStore.getItemAsync("nomSuperviseur");
    let prenom = await SecureStore.getItemAsync("prenomSuperviseur");
    if (nom && prenom) {
      console.log(nom, prenom);
      const commentDto: CommentaireDto = await addCommentaire(toko5Repository, toko5.toko5Id, nom, prenom, newComment);
      let toko5copy: Toko5Json = JSON.parse(JSON.stringify(toko5));
      toko5copy.listCommentaire.unshift(commentDto);
      setToko5(toko5copy);
    }
  };


  const handleResolveToko5 = async () => {
    
  }

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
                <Icon source="account-hard-hat" size={20} color={theme.colors.primary} />
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
                <Icon source="clipboard-check" size={24} color={theme.colors.primary} />
                <Text style={styles.sectionTitle}>
                  Mesures de Contrôle ({toko5.listMesureControle.length})
                </Text>
              </View>

              <ScrollView
                style={styles.scrollableSection}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {toko5.listMesureControle.map((item: MesureControleDto, index: number) => (
                  <View key={index} style={styles.measureItem}>
                    <View style={styles.measureHeader}>
                      <View style={styles.measureTitleContainer}>
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
                        <View style={styles.questionTextContainer}>
                          <Text style={styles.questionLabel}>Danger/risque</Text>
                          <Text style={styles.questionText}>{item.question.nom}</Text>
                        </View>
                        <Icon source={imagePathMapping(item.question.pictogramme)} size={40} />
                      </View>
                    )}

                    {index < toko5.listMesureControle.length - 1 && (
                      <Divider style={styles.itemDivider} />
                    )}
                  </View>
                ))}
              </ScrollView>
            </Card.Content>
          </Card>
        )}

        {/* Comments Section */}
        <Card style={styles.sectionCard} mode='contained'>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon source="message-text" size={24} color={theme.colors.primary} />
              <Text style={styles.sectionTitle}>
                Commentaires ({toko5.listCommentaire?.length || 0})
              </Text>
            </View>

            {toko5.listCommentaire && toko5.listCommentaire.length > 0 ? (
              <ScrollView
                style={styles.scrollableSection}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {toko5.listCommentaire.map((item: CommentaireDto, index: number) => (
                  <View key={index} style={styles.commentItem}>
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
                      </View>
                    </View>

                    <Text style={styles.commentText}>{item.commentaire}</Text>

                    {index < toko5.listCommentaire.length - 1 && (
                      <Divider style={styles.itemDivider} />
                    )}
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.noCommentsContainer}>
                <Icon source="message-outline" size={32} color="#999" />
                <Text style={styles.noCommentsText}>Aucun commentaire pour le moment</Text>
              </View>
            )}

            {/* Add Comment Button */}
            {/* <Button 
              mode="contained" 
              onPress={handleAddComment}
              style={styles.addCommentButton}
              icon="plus"
            >
              Ajouter un commentaire
            </Button> */}
          </Card.Content>
        </Card>
        <Card style={styles.sectionCard} mode='contained'>
          <Card.Content>
            <TextInput
              mode="outlined"
              placeholder="Écrivez votre commentaire ici..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
              numberOfLines={3}
              style={styles.commentInput}
              outlineStyle={styles.inputOutline}
            />

            <Button
              mode="contained"
              onPress={handleAddComment}
              style={styles.addButton}
              icon="send"
              disabled={!newComment.trim()}
              labelStyle={{ color: "white" }}
            >
              commenter
            </Button>
          </Card.Content>
        </Card>

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
              <ScrollView
                style={styles.scrollableSection}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {toko5.listProblem.map((item: QuestionDto, index: number) => (
                  <Text key={index} style={styles.problemText}>• {item.nom}</Text>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyState}>
                <Icon source="check" size={32} color="#4CAF50" />
                <Text style={styles.emptyStateText}>Ce toko 5 est ok</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {toko5.listProblem.length > 0 && (
          <Card style={styles.sectionCard} mode='contained'>
            <Card.Content>
              <Button
                mode="contained"
                onPress={handleResolveToko5}
                style={styles.addButton}
                icon="send"
                disabled={!newComment.trim()}
                labelStyle={{ color: "white" }}
              >
                laisser continuer le toko 5
              </Button>
            </Card.Content>
          </Card>
        )}
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
    color: "rgba(26, 85, 161, 0.87)",
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
  scrollableSection: {
    maxHeight: 300, // Adjust this value as needed
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
  measureTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  implementedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(26, 85, 161, 0.87)",
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
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  questionTextContainer: {
    flex: 1,
    marginRight: 12,
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
    backgroundColor: "rgba(26, 85, 161, 0.87)",
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
  commentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  noCommentsContainer: {
    alignItems: 'center',
    padding: 24,
  },
  noCommentsText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  addCommentButton: {
    marginTop: 16,
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

  commentInput: {
    backgroundColor: 'white',
    marginBottom: 16,
    fontSize: 14,
  },
  inputOutline: {
    borderRadius: 8,
  },
  addButton: {
    borderRadius: 8,
    backgroundColor: "rgba(26, 85, 161, 0.87)"
  },
});